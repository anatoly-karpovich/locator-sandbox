import path from "path";
import fs from "fs";
import { ITrainingRun, TrainingRunId } from "../core/training/types";

export class TrainingRunsRepository {
  private filePath = path.resolve(process.cwd(), "src/db/trainingRuns.json");

  create(run: Omit<ITrainingRun, "id">): ITrainingRun {
    const newRun: ITrainingRun = {
      id: Date.now().toString(),
      ...run,
    };

    this.saveOne(newRun);
    return newRun;
  }

  update(runId: TrainingRunId, run: ITrainingRun): ITrainingRun | null {
    const runs = this.readAll();
    const index = runs.findIndex((r) => r.id === runId);
    if (index === -1) return null;
    runs[index] = run;
    this.writeAll(runs);
    return run;
  }

  getById(id: TrainingRunId): ITrainingRun | null {
    const runs = this.readAll();
    return runs.find((r) => r.id === id) ?? null;
  }

  getAll(): ITrainingRun[] {
    return this.readAll();
  }

  private readAll(): ITrainingRun[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "[]");
    }

    const raw = fs.readFileSync(this.filePath, "utf-8");

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private writeAll(runs: ITrainingRun[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(runs, null, 2));
  }

  private saveOne(run: ITrainingRun) {
    const runs = this.readAll();
    runs.push(run);
    this.writeAll(runs);
  }
}
