import { injectable } from "inversify";
import { topics } from "../db/topics.js";
import { TopicId, SectionId } from "@core/tasks/types.js";
import { ITopicRepository } from "@repositories/types.js";

@injectable()
export class TopicRepository implements ITopicRepository {
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
