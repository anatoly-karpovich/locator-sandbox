// curriculum/validateCurriculum.ts

import tasksService from "../../core/tasks/tasks.service";
import { curriculum } from "./curriculum.config";

export function validateCurriculum(): void {
  const missing: string[] = [];

  for (const module of curriculum.modules) {
    for (const section of module.sections) {
      for (const topic of section.topics) {
        const tasks = tasksService.getByDifficulty(topic.level);
        missing.push(...tasks.map((t) => t.id));
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(`Curriculum references missing task IDs: ${missing.join(", ")}`);
  }
}
