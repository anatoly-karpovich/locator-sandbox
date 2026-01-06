import { injectable } from "inversify";
import { topics } from "../db/topics";
import { TopicId, SectionId } from "../core/tasks/types";

export interface ITopicRepository {
  getById(id: TopicId): typeof topics[number] | undefined;
  getBySectionId(sectionId: SectionId | SectionId[]): typeof topics;
  getAll(): typeof topics;
}

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
