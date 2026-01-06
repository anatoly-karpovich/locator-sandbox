import { injectable } from "inversify";
import { ModuleId } from "../core/tasks/types";
import { modules } from "../db/modules";

export interface IModuleRepository {
  getById(id: ModuleId): typeof modules[number] | undefined;
  getAll(): typeof modules;
}

@injectable()
export class ModuleRepository implements IModuleRepository {
  getById(id: ModuleId) {
    return modules.find((m) => m.id === id);
  }

  getAll() {
    return modules;
  }
}
