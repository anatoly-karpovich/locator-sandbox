import { injectable } from "inversify";
import { ModuleId } from "@core/tasks/types.js";
import { modules } from "../db/modules.js";
import { IModuleRepository } from "@repositories/types.js";

@injectable()
export class ModuleRepository implements IModuleRepository {
  getById(id: ModuleId) {
    return modules.find((m) => m.id === id);
  }

  getAll() {
    return modules;
  }
}
