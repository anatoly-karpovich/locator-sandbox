import { trainings } from "../db/trainings";

class TrainingTemplateRepository {
  private table = trainings;

  getAll() {
    return this.table;
  }

  getById(id: string) {
    return this.table.find((training) => training.id === id);
  }
}

export default new TrainingTemplateRepository();
