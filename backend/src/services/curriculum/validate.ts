// curriculum/validateCurriculum.ts

import tasksService from "../../tasks/tasks.service";
import { curriculum } from "./curriculum.config";

export function validateCurriculum(): void {
  const missing: number[] = [];

  for (const module of curriculum.modules) {
    for (const section of module.sections) {
      for (const topic of section.topics) {
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
