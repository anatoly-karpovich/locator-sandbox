import express from "express";
import { chromium } from "playwright";
import { parsePlaywrightLocatorAst } from "./ast-parser/parser";
import { LocatorService } from "./locator/locator.service";
import { TaskHandler } from "./tasks/taskHandler";
import { tasks } from "./tasks/storage";

const app = express();
app.use(express.json());

app.post("/api/verify-locator", async (req, res) => {
  const { payload, taskId } = req.body as unknown as { payload: string; taskId: number };

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const browser = await chromium.launch(); // consider pooling
  const page = await browser.newPage();

  const locatorService = new LocatorService(page);
  const taskService = new TaskHandler();

  let result: any = {
    text: "",
    count: 0,
    isVisible: false,
  };
  try {
    await page.setContent(task.html);
    // await page.setContent("<h1>dream<button>Test button</button></h1><h1>Main title</h1>", {
    //   waitUntil: "domcontentloaded",
    // });
    // await page.setContent("<h1>dream</h1><h1>Main title</h1>", { waitUntil: "domcontentloaded" });

    // const payload = `page.locator('h1',{ has:page.getByRole('button')})`;
    // const errors = parsePlaywrightLocatorAst(h1);
    const locator = locatorService.createLocator(payload);

    const isPresented = await locatorService.checkPresence(locator);
    if (!isPresented.attached) throw new Error("Element not found");

    result = await taskService.runTask(task, locator);

    res.status(200).json({
      isSuccess: true,
      result,
    });
  } catch (e: any) {
    let error = "";
    if (e.message.includes("locator.waitFor")) {
      error = "Element not found";
    } else {
      error = e.message ?? "Unknown error";
    }
    res.status(400).json({ IsSuccess: false, ErrorMessage: error });
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
