import { ModuleId } from "../core/tasks/types";
import { modules } from "../db/modules";

export class ModuleRepository {
  getById(id: ModuleId) {
    return modules.find((m) => m.id === id);
  }

  getAll() {
    return modules;
  }
}
