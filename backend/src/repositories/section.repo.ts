import { injectable } from "inversify";
import { sections } from "../db/sections.js";
import { SectionId } from "@core/tasks/types.js";
import { ISectionRepository } from "@repositories/types.js";

@injectable()
export class SectionRepository implements ISectionRepository {
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
