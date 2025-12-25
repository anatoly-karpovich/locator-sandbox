import express from "express";

import solutionsRouter from "./router/solutions.router";

const app = express();
app.use(express.json());
app.use("/api", solutionsRouter);

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
