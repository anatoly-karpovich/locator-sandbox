import { injectable } from "inversify";
import { trainings } from "../db/trainings.js";
import { ITrainingTemplateRepository } from "@repositories/types.js";

@injectable()
export class TrainingTemplateRepository implements ITrainingTemplateRepository {
  private table = trainings;

  getAll() {
    return this.table;
  }

  getById(id: string) {
    return this.table.find((training) => training.id === id);
  }
}
