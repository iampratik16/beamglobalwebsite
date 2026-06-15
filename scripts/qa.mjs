import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const widths = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const routes = ["/", "/services/safepaas-grc-implementation", "/about", "/contact", "/blog/the-growth-loop-how-customer-success-fuels-sustainable-scale"];

for (const vp of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: "networkidle0" });
    const m = await page.evaluate(() => ({
      docW: document.documentElement.scrollWidth,
      winW: window.innerWidth,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    }));
    const flag = m.overflow > 1 ? "  <-- HORIZONTAL OVERFLOW" : "";
    console.log(`${vp.name.padEnd(8)} ${route.padEnd(60)} doc=${m.docW} win=${m.winW} overflow=${m.overflow}${flag}`);
  }
  await page.close();
}

// Full-page screenshots of the homepage at mobile + desktop
const shots = [
  { name: "home-mobile", route: "/", width: 390, height: 844 },
  { name: "home-desktop", route: "/", width: 1440, height: 900 },
  { name: "service-desktop", route: "/services/safepaas-grc-implementation", width: 1440, height: 900 },
];
for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: 1 });
  await page.goto(BASE + s.route, { waitUntil: "networkidle0" });
  // Scroll through to trigger IntersectionObserver reveal-on-scroll
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await page.screenshot({ path: `/tmp/qa-${s.name}.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log("screenshots: /tmp/qa-home-mobile.png /tmp/qa-home-desktop.png /tmp/qa-service-desktop.png");
