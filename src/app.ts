import express from "express";
import { chromium } from "playwright";
import { parsePlaywrightLocatorAst } from "./ast-parser/parser";
import { Locator } from "playwright-core";

const app = express();
app.use(express.json());

app.post("/api/verify-locator", async (req, res) => {
  // const { url, locatorInput } = req.body as { url: string; locatorInput: string };
  const browser = await chromium.launch(); // consider pooling
  const page = await browser.newPage();

  try {
    // await page.setContent("<h1>dream<button>Test button</button></h1><h1>Main title</h1>", { waitUntil: "domcontentloaded" });
    await page.setContent("<h1>dream</h1><h1>Main title</h1>", { waitUntil: "domcontentloaded" });

    const h1 = `page.locator('h1',{ has:page.getByRole('button')})`;
    const errors = parsePlaywrightLocatorAst(h1);
    let locator: Locator = eval(h1);

    // const settled = await Promise.allSettled([
    //   locator.count(),
    //   locator.innerText(),
    //   locator.isVisible(),
    // ]);
    const result = await Promise.race([new Promise((r) => setTimeout(r, 1000)), Promise.allSettled([
      locator.count(),
      locator.innerText(),
      locator.isVisible(),
    ])]);
    // const count = await locator.count(); // 1
    // const textContent = await locator.textContent(); // "Main title"
    // const isVisible = await locator.isVisible(); // true

    res.status(200).json({
      result
    });
  } catch (e: any) {
    res.status(400).json({ error: e?.message ?? "Unknown error" });
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
  }
});

// export async function verifyLocator(page: Page, input: string) {
//   const plan = parseLocatorInput(input);
//   const locator = buildLocator(page, plan);

//   // fast check
//   const count = await locator.count();
//   return { found: count > 0, count };
// }

async function startApp() {
  const PORT = 3333;
  try {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
