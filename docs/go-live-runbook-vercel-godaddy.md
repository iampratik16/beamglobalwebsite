# Go-Live Runbook — host a Next.js site on a custom domain (Vercel + GoDaddy)

A repeatable, copy-paste procedure for taking a Next.js app already deployed on
Vercel and pointing a custom domain at it — **without breaking existing email** —
plus every gotcha we actually hit and how to fix it.

Reference setup this was written for (adapt placeholders as needed):
- **Host:** Vercel (project auto-deploys from a GitHub repo)
- **Registrar / DNS:** GoDaddy (DNS stays at GoDaddy — we do *not* move nameservers)
- **Email:** Google Workspace on the same domain (MX → `aspmx.l.google.com`) — must stay intact
- **Domain:** `example.com` (apex) + `www.example.com` — below, `www` is the primary

> Golden rule for email: **website records (A / CNAME) and email records (MX / TXT)
> are independent.** Keep GoDaddy's nameservers, only edit the website records,
> never touch MX or the email-related TXT (SPF/DKIM/DMARC). Email stays safe.

---

## TL;DR checklist

1. [ ] Connect the Vercel CLI (one-time device login)
2. [ ] Capture current DNS as a baseline (NS, MX, A, TXT) — proof email is safe
3. [ ] Add `example.com` + `www.example.com` in Vercel (apex → www redirect)
4. [ ] In GoDaddy: set `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`
5. [ ] Verify ownership if Vercel says "linked to another account" → add `_vercel` TXT(s)
6. [ ] Refresh in Vercel → wait for SSL certs to issue (apex + www, each separate)
7. [ ] Update the app's canonical `site.url` to the primary host, redeploy
8. [ ] Verify both hosts over HTTPS from an independent network; confirm MX unchanged
9. [ ] Clear local browser DNS/cert cache to see the padlock

---

## 0. Prerequisites

- The app is already deployed and working on its `*.vercel.app` URL.
- You have access to the GoDaddy DNS page and the Vercel account that owns the project.
- `npx` available locally (the Vercel CLI runs via `npx vercel` — no global install needed).

---

## 1. Connect the Vercel CLI (one-time)

The CLI uses a **device login**: it prints a URL + code, you approve in the browser
**once**, and the token is saved on the machine for all future commands/sessions.

```bash
npx vercel login          # prints a URL like https://vercel.com/oauth/device?user_code=XXXX-XXXX
```
Open that URL, enter the code, approve. Then:

```bash
npx vercel whoami         # should print your username
cd /path/to/project
npx vercel link --yes --project <vercel-project-name>
```

> Gotcha: `vercel: command not found` just means it isn't installed globally — always
> use `npx vercel`. The login is interactive (browser) and is the **only** step an
> automated agent can't do for you; everything after is scriptable.

---

## 2. Add the custom domain in Vercel

Dashboard → **Project → Settings → Domains → Add**:
1. Enter the apex: `example.com`
2. Keep **"Redirect apex domains to www (recommended)"** checked → this makes
   `www.example.com` the primary and auto-adds the apex as a 308 redirect to it.
3. **Connect to an environment → Production** (not "Redirect to Another Domain").
4. Click **Add Domain**.

You'll see **"Invalid Configuration"** / **"Verification Needed"** until DNS points
at Vercel — that's expected, fix it in the next step.

> CLI note: `vercel domains add` works only for account-registered domains. For a
> custom domain you're pointing from elsewhere, use the **dashboard** to add it.

---

## 3. Point GoDaddy DNS at Vercel (without breaking email)

### 3a. Capture a baseline first (so you can prove email is untouched)

```bash
D=example.com
dig +short NS  $D     # who controls DNS (expect *.domaincontrol.com = GoDaddy)
dig +short MX  $D     # EMAIL — record this; must NOT change
dig +short A   $D     # current website IP (this is what we repoint)
dig +short TXT $D     # SPF etc. — must NOT change
```

### 3b. Edit exactly two records in GoDaddy

GoDaddy → your domain → **DNS → DNS Records**. Scroll **past** the promo cards to the
records table (each row has a pencil/Edit + trash/Delete). Ignore "Connect Domain /
GoDaddy Airo / Verify Domain Ownership" upsells.

| Action | Type | Name | New value | TTL |
|---|---|---|---|---|
| **Edit** existing | A | `@` | `76.76.21.21` | 600 |
| **Edit** (or add if missing) | CNAME | `www` | `cname.vercel-dns.com` | 600 |

- **A record:** EDIT the existing `@` A record (don't add a second one, or traffic
  splits between old host and Vercel).
- **www:** if it's an A record, change it to a CNAME; if it's a CNAME to `@`, repoint it.

### 3c. Do NOT touch (this is what protects email)

- All **MX** records (e.g. Google's `aspmx.l.google.com`, `alt1..4`)
- Any **TXT** records (SPF `v=spf1 ...`, `google._domainkey` DKIM, `_dmarc`)
- The **Nameservers** tab (keep GoDaddy's `*.domaincontrol.com`)
- Turn **off** GoDaddy **Domain Forwarding** if it's on (it overrides the A record)

### 3d. Verify the change landed (authoritative = instant)

```bash
NS=ns13.domaincontrol.com   # use one of the NS from step 3a
dig @$NS +short A     example.com         # want 76.76.21.21
dig @$NS +short CNAME www.example.com     # want cname.vercel-dns.com
dig @$NS +short MX    example.com         # want your Google MX, UNCHANGED
dig @1.1.1.1 +short A example.com         # public resolver = propagation check
```

---

## 4. Verify domain ownership (only if "Verification Needed")

If the domain was **ever connected to Vercel before** (even a different/old account),
Vercel shows **"Verification Needed — This domain is linked to another Vercel account"**
and refuses to issue a certificate until you prove ownership with a **TXT record**.

**Important:** the apex and www are *separate entries* and each needs its **own** token.

1. Click **"Learn more"** under each domain's "Verification Needed".
2. It shows a TXT record like:
   - Name: `_vercel`
   - Value: `vc-domain-verify=<host>,<unique-token>`  (the host part differs for apex vs www)
3. In GoDaddy → **Add New Record → TXT**, Name `_vercel`, paste the value. Add **one
   per domain** — you'll have **two `_vercel` TXT records** (apex + www). Both are fine.
4. Verify they're live, then click **Refresh** on each domain in Vercel:

```bash
dig @ns13.domaincontrol.com +short TXT _vercel.example.com   # should list both tokens
```

> `_vercel` TXT records are safe for email — they don't touch MX/SPF.
> You may delete them after verification completes (optional).

---

## 5. Let the SSL certificates issue

Once a domain shows a **blue check** (verified), Vercel auto-issues a free Let's Encrypt
certificate — usually within a few minutes. **The apex and www get separate certs**, so
both must reach the blue-check state.

- You **cannot** force this from the CLI for project-attached domains
  (`vercel certs issue` only works for account-registered domains).
- Just wait, then click **Refresh**. If after ~20 min a cert is still stale, the reliable
  nudge is to **Edit → Remove** the domain in Vercel and **Add** it again (it's already
  verified, so re-adding re-triggers issuance).

### Optional: move to Vercel's newer DNS targets ("DNS Change Recommended")

Vercel may recommend newer records (IP-range expansion). The old ones keep working, so
this is optional, but doing it clears the warning and aligns with their new infra:

| Type | Name | New (recommended) value |
|---|---|---|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `<unique-id>.vercel-dns-017.com` (shown per-domain in Vercel) |

---

## 6. Update the app's canonical URL (code)

Make the app's canonical/sitemap/OG host match the **primary** domain you chose (here,
`www`). In this repo that's a single source of truth:

```ts
// src/content/site.ts
export const site = {
  // ...
  url: "https://www.example.com",   // was https://example.com
};
```

Then build, commit, and push (GitHub → Vercel auto-deploys):

```bash
npm run build            # sanity check
git add src/content/site.ts
git commit -m "Set canonical site URL to primary host"
git push origin main     # triggers Vercel deploy
```

This keeps `metadataBase`, `<link rel=canonical>`, `sitemap.xml`, `robots.txt` host, and
OG URLs consistent with the served host (avoids "canonical points to a redirect").

---

## 7. Verify everything (from an independent network)

```bash
# Both should return a real HTTP status WITHOUT -k (i.e. the cert is valid & trusted).
for H in example.com www.example.com; do
  echo "== $H =="
  curl -sS -o /dev/null -w "HTTPS: %{http_code} -> %{redirect_url}\n" "https://$H"
  IP=$(dig @1.1.1.1 +short $H | grep -E '^[0-9]' | head -1)
  echo | openssl s_client -connect ${IP}:443 -servername $H 2>/dev/null \
    | openssl x509 -noout -issuer -dates
done
```
Expected: `www` → `200` with a current Let's Encrypt cert; apex → `308` redirect to
`www` with its own current cert.

Confirm MX is still your mail provider (email safe):
```bash
dig +short MX example.com    # unchanged from the baseline in step 3a
```

DNS propagation is usually minutes (we saw <2 min), up to 48h worst case.

---

## Troubleshooting — the gotchas we actually hit

**"Sorry, unable to open the file at present" when POSTing/GETting the Vercel URL**
→ The deployment/domain isn't publicly reachable *yet*: either DNS hasn't propagated,
or (for a Vercel web app/Apps Script) access wasn't set to public, or it's still
provisioning. Confirm DNS resolves to Vercel and wait a few minutes; test in Incognito.

**`curl` POST to a Google Apps Script `/exec` fails but the app works**
→ Apps Script 302-redirects POSTs and `curl -L` mishandles it. Test the *real* code path
with Node `fetch` instead:
```bash
node -e 'fetch(URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...})}).then(r=>r.text()).then(console.log)'
```

**Browser shows expired cert / `NET::ERR_CERT_DATE_INVALID`, and `curl` (no `-k`) fails**
→ Vercel is serving a leftover cert because the domain is **not verified** (often
"linked to another Vercel account"). Fix = the `_vercel` TXT verification in step 4.

**You see the OLD site (e.g. previous WordPress) in your browser, but tools show the new one**
→ Your **browser/OS DNS cache** still points at the old host. The new site is fine; your
machine just hasn't switched. Flush it:
```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder   # macOS
```
Chrome: `chrome://net-internals/#dns` → Clear host cache. Or test in Incognito / on phone.

**`www` is secure but the bare apex (or vice-versa) is still "Not Secure"**
→ Apex and www are **separate** Vercel entries with **separate** verification + certs.
Verify the one that's lagging (its own `_vercel` token) and let its cert issue.

**Browser still says "Not Secure" even though the dropdown says "Certificate is valid"**
→ You earlier clicked **Advanced → Proceed** past a cert warning; Chrome keeps that site
"downgraded" for the session. It's **not** a real problem. Fully quit & reopen Chrome,
or use a fresh Incognito window. (Also rule out mixed content: `curl -s URL | grep
'http://'` should find no insecure resource refs.)

**Cert won't issue after ~20 min despite a blue check**
→ Remove the domain in Vercel and re-add it (already verified, so it re-triggers issuance),
and/or switch to Vercel's newer DNS targets (step 5, optional table).

---

## Why email never breaks (the one thing to never get wrong)

- We keep **GoDaddy's nameservers** → all existing records (MX, SPF, DKIM, DMARC) stay live.
- We change **only** the website's `A`/`CNAME` and add `_vercel` TXT(s) for verification.
- MX records (mail routing) are a different record type entirely; changing A/CNAME has
  **zero** effect on them. Always re-confirm with `dig +short MX example.com` before & after.
- **Never** switch nameservers to Vercel for this setup — that would move *all* DNS to
  Vercel and you'd have to recreate every MX/TXT record (high risk of an email outage).

---

## Reusable command cheat-sheet

```bash
# --- Vercel CLI ---
npx vercel login                                   # one-time device login
npx vercel whoami
npx vercel link --yes --project <project>
npx vercel ls                                      # list deployments
npx vercel redeploy <deployment-url>               # redeploy (e.g. to pick up env vars)
npx vercel env add KEY production                   # add env var (value via stdin)

# --- DNS / cert verification ---
dig +short NS|MX|A|TXT example.com                 # inspect records
dig @<authoritative-ns> +short A example.com       # instant (no cache)
dig @1.1.1.1 +short A example.com                  # propagation via public resolver
curl -sS -I https://www.example.com                # fails if cert invalid (no -k = strict)
echo | openssl s_client -connect <ip>:443 -servername www.example.com 2>/dev/null \
  | openssl x509 -noout -issuer -subject -dates    # inspect the served cert

# --- local cache flush (macOS) ---
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
