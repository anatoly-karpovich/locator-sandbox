import { injectable } from "inversify";
import { trainings } from "../db/trainings";

export interface ITrainingTemplateRepository {
  getAll(): typeof trainings;
  getById(id: string): typeof trainings[number] | undefined;
}

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
