import { topics } from "../db/topics";
import { TopicId, SectionId } from "../core/tasks/types";

export class TopicRepository {
  getById(id: TopicId) {
    return topics.find((t) => t.id === id);
  }

  getBySectionId(sectionId: SectionId | SectionId[]) {
    if (Array.isArray(sectionId)) return topics.filter((t) => sectionId.includes(t.sectionId));
    else return topics.filter((t) => t.sectionId === sectionId);
  }

  getAll() {
    return topics;
  }
}
