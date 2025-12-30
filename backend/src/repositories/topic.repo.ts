import { topics } from "../db/topics";
import { TopicId, SectionId } from "../core/tasks/types";

class TopicRepository {
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

export default new TopicRepository();
