import { injectable } from "inversify";
import { sections } from "../db/sections";
import { SectionId } from "../core/tasks/types";

export interface ISectionRepository {
  getById(id: SectionId): typeof sections[number] | undefined;
  getByModuleId(moduleId: SectionId): typeof sections;
  getAll(): typeof sections;
}

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
