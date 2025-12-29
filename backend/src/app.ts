import express from "express";

import solutionsRouter from "./router/solutions.router";
import tasksRouter from "./router/tasks.router";
import curriculumRouter from "./router/curriculum.router";
import trainingRouter from "./router/training.router";

const app = express();
app.use(express.json());
app.use("/api", solutionsRouter);
app.use("/api", tasksRouter);
app.use("/api", curriculumRouter);
app.use("/api", trainingRouter);

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
