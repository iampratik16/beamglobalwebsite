# Contact form → Google Sheet

Contact form submissions are appended as rows to a Google Sheet. The website
never talks to the Google API directly: instead it POSTs each validated
submission to a small **Google Apps Script web app** that lives inside the
sheet. This needs no service-account keys, no extra npm packages, and no Google
Cloud project.

```
Visitor → ContactForm → submitContact() server action → appendContactToSheet()
        → POST /exec (Apps Script web app) → appendRow() → Google Sheet
```

- Server action: [src/lib/contact-action.ts](../src/lib/contact-action.ts)
- Sheet client: [src/lib/contact-sheet.ts](../src/lib/contact-sheet.ts)
- Target sheet: <https://docs.google.com/spreadsheets/d/1ii9f-WkKnQZ7e3lgBpheD64DCrkR41c4NicHNPSuCpc/edit>

## Behaviour

Storage is active only when **both** `CONTACT_SHEET_WEBHOOK_URL` and
`CONTACT_SHEET_SECRET` are set.

| Situation | What the visitor sees | What happens server-side |
|---|---|---|
| Not configured, **dev** (`next dev`) | Success message | Nothing stored; a `console.warn` notes it (no enquiry data logged) |
| Not configured, **production** | Honest error + "email us directly", typed values preserved | Nothing stored; a `console.error` flags the misconfiguration (no enquiry data logged) |
| Sheet write succeeds | Success message | New row appended to the sheet |
| Sheet write fails (network/timeout/misconfig) | Honest error + "email us directly", typed values preserved | Full enquiry logged with `console.error` so the lead is recoverable |

An 8-second timeout bounds how long the visitor's submit waits on a slow Apps
Script, and a shared secret stops anyone who finds the `/exec` URL from writing
junk rows. The form never shows a false "received": in production it fails
honestly when storage is unavailable, so a forgotten env var can't silently drop
leads.

---

## One-time setup

### 1. Create the Apps Script (bound to the sheet)

1. Open the [sheet](https://docs.google.com/spreadsheets/d/1ii9f-WkKnQZ7e3lgBpheD64DCrkR41c4NicHNPSuCpc/edit).
2. **Extensions → Apps Script** (this binds the script to *this* sheet).
3. Delete any boilerplate and paste in [the script below](#the-apps-script).
4. Save (the project name can be anything, e.g. "Beam contact form").

### 2. Set the shared secret

1. Generate a random secret, e.g. in a terminal: `openssl rand -hex 24`
2. In the Apps Script editor: **Project Settings (⚙) → Script properties → Add script property**
   - Property: `SHARED_SECRET`  →  Value: *(your secret)*
3. *(Optional)* Add `SHEET_ID` = `1ii9f-WkKnQZ7e3lgBpheD64DCrkR41c4NicHNPSuCpc` if you
   ever run the script standalone rather than bound. Not needed for the bound setup.

### 3. Deploy as a web app

1. **Deploy → New deployment → ⚙ → Web app**.
2. Configure:
   - **Execute as:** *Me* (your Google account)
   - **Who has access:** the **anonymous** option — labelled **"Anyone"**, *not*
     "Anyone with Google account". Wording varies by Apps Script version; pick
     whichever does **not** require a Google login. This is the #1 setup
     mistake: the account-gated option makes server-to-server POSTs hit a Google
     login page, so submissions fail with no new rows and no obvious error.
3. **Deploy**, then **Authorize access** (approve the permissions for your account).
4. Copy the **Web app URL** — it ends in `/exec`.

> Re-deploying for code changes: use **Deploy → Manage deployments → ✏ Edit →
> Version: New version**. This keeps the same `/exec` URL so you don't have to
> update the env var.

**Quick pre-flight** (isolates the deployment from the rest of the form):

```bash
curl -L -X POST '<your /exec URL>' \
  -H 'Content-Type: application/json' \
  -d '{"secret":"<your secret>","name":"Test","email":"test@example.com","company":"","message":"hello"}'
```

Expect `{"ok":true}` and a new row. HTML back means the access level is wrong
(see step 2); `{"ok":false,"error":"unauthorized"}` means the secret doesn't
match `SHARED_SECRET`.

### 4. Point the website at it

Edit [.env.local](../.env.local) (gitignored) and restart the dev server:

```bash
CONTACT_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
CONTACT_SHEET_SECRET=<the same secret you set as SHARED_SECRET>
```

For production, set the **same two variables** in your host's environment
settings (Vercel/Netlify/etc. → Project → Environment Variables), then redeploy.

### 5. Verify

1. Restart: `npm run dev`
2. Submit the form at <http://localhost:3000/contact>.
3. A new row (Submitted at · Name · Email · Company · Message) should appear in
   the sheet's **Responses** tab.

---

## The Apps Script

Paste this into the Apps Script editor (`Code.gs`):

```javascript
/**
 * Beam Global Services — contact form → Google Sheet bridge.
 * Deploy as a Web app: Execute as = Me, Who has access = Anyone.
 * The Next.js server action POSTs JSON here; we verify a shared secret,
 * then append a row. See docs/contact-sheet-setup.md.
 */

var SHEET_NAME = 'Responses';
var HEADERS = ['Submitted at', 'Name', 'Email', 'Company', 'Message'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'no-body' });
    }

    var body = JSON.parse(e.postData.contents);

    // Shared-secret check — FAIL CLOSED. Set SHARED_SECRET in Project Settings →
    // Script properties, matching CONTACT_SHEET_SECRET in the website's env. If
    // the property is missing or empty, every write is rejected, so the public
    // endpoint is never left open.
    var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!expected || body.secret !== expected) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    // Serialize writes so a first-ever concurrent burst can't double-write the
    // header row, and to avoid transient "document is locked" errors.
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet_().appendRow([
        body.submittedAt || new Date().toISOString(),
        body.name || '',
        body.email || '',
        body.company || '',
        body.message || '',
      ]);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true });
  } catch (err) {
    // Log the real reason where the operator can see it (Apps Script Executions
    // / Cloud Logging); return a generic message so a public caller learns
    // nothing about internals.
    console.error('contact doPost failed', err);
    return json_({ ok: false, error: 'server-error' });
  }
}

// Reject GET so a stray browser visit doesn't look like a working endpoint.
function doGet() {
  return json_({ ok: false, error: 'use-post' });
}

function getSheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor (▶ testAppend) to confirm appending works and to
// trigger the first authorization prompt, before deploying.
function testAppend() {
  getSheet_().appendRow([new Date().toISOString(), 'Test', 'test@example.com', 'Beam', 'Hello from testAppend()']);
}
```

---

## Notes

- **CORS:** none. The request is server-to-server (Next.js server action → Apps
  Script), never browser-to-Google, so there is no preflight to worry about.
- **App-level errors return HTTP 200.** Apps Script's `ContentService` always
  responds 200, so the website checks the JSON `{ ok: true }` flag (not the HTTP
  status) to decide success. A login/redirect HTML page therefore reads as a
  failed write, not a false success.
- **Fail-closed secret.** The script rejects every write unless `SHARED_SECRET`
  is set and matches, so deleting/clearing the property *disables* the endpoint
  (returns `unauthorized`) rather than leaving it open — re-verify after any
  change. The website likewise treats a missing `CONTACT_SHEET_SECRET` as "not
  configured" and won't fire an unauthenticated request.
- **Rotating the secret:** change `SHARED_SECRET` in Script properties *and*
  `CONTACT_SHEET_SECRET` in the env, then restart/redeploy. They must match.
- **PII & log retention.** On a *rare* failed write (storage wired but the POST
  failed) the server logs the full enquiry via `console.error` so the lead is
  recoverable — the only place enquiry data touches logs (the not-configured
  paths log none). If your host retains function logs, account for this contact
  PII in your retention/erasure policy.
- **Duplicate rows on retry.** There's no idempotency key. In the narrow case
  where a write *succeeds* but its response is lost (e.g. a timeout mid-redirect),
  the visitor sees the error and a re-submit appends a second near-identical row.
  Low risk for a low-volume form; de-duplicate adjacent rows manually if it
  happens.
- **Function timeout.** The client aborts after 8s. If your host's serverless
  function limit is at or below that, raise it (e.g. `export const maxDuration = 30`
  on the contact route, or `vercel.json`) so the abort — not a platform 500 —
  drives the honest error UX.
- **Want email too?** Add `MailApp.sendEmail(...)` inside `doPost` after the
  `appendRow`, or wire a provider at the same integration point in the server
  action.
