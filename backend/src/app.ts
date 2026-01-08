import "reflect-metadata";
import express from "express";
import { tasksRouter, trainingsRouter, trainingsRunsRouter, playgroundRouter } from "./router/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use("/api", tasksRouter);
app.use("/api", trainingsRunsRouter);
app.use("/api", trainingsRouter);
app.use("/api", playgroundRouter);
app.use(errorMiddleware);

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
