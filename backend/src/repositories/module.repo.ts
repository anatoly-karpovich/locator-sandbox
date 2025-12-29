import { ModuleId } from "../core/tasks/types";
import { modules } from "../db/modules";

class ModuleRepository {
  getById(id: ModuleId) {
    return modules.find((m) => m.id === id);
  }

  getAll() {
    return modules;
  }
}

export default new ModuleRepository();
