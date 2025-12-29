import { Module, TaskSection, TaskGetByTopic } from "../tasks/enums";
import { TrainingTemplateId, ITrainingTemplate } from "./types";

class TrainingCatalog {
  private storage: Record<TrainingTemplateId, ITrainingTemplate> = {
    "31e14518-589f-4d9c-aad1-0c29b34e4580": {
      id: "31e14518-589f-4d9c-aad1-0c29b34e4580",
      title: "Get by text",
      description: "",
      taskIds: ["a5d6f5de-385f-4b50-abca-52370d3fb58a", "6cf7c8b5-0d3e-4238-9db6-ec981976acba"],
      scope: {
        module: Module.PLAYWRIGHT_LOCATORS,
        section: TaskSection.GET_BY,
        topic: TaskGetByTopic.GET_BY_TEXT,
      },
      difficulty: "beginner",
      createdAt: "",
      updatedAt: "",
    },
  };

  getById(id: TrainingTemplateId) {
    return this.storage[id];
  }

  getAll() {
    return Object.values(this.storage);
  }
}

export default new TrainingCatalog();
