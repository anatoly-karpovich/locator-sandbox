import { sections } from "../db/sections";
import { SectionId } from "../core/tasks/types";

class SectionRepository {
  getById(id: SectionId) {
    return sections.find((s) => s.id === id);
  }

  getByModuleId(moduleId: SectionId) {
    return sections.filter((s) => s.moduleId === moduleId);
  }

  getAll() {
    return sections;
  }
}

export default new SectionRepository();
