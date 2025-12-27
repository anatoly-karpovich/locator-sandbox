// curriculum/validateCurriculum.ts

import tasksService from "../../tasks/tasks.service";
import { curriculum } from "./curriculum.config";

export function validateCurriculum(): void {
  const missing: number[] = [];

  for (const section of curriculum.sections) {
    for (const module of section.modules) {
      for (const topic of module.topics) {
        for (const taskId of topic.taskIds) {
          if (!tasksService.getById(taskId)) {
            missing.push(taskId);
          }
        }
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(`Curriculum references missing task IDs: ${missing.join(", ")}`);
  }
}
