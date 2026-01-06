import { Difficulty, Task, TaskId, TopicId, ModuleId, SectionId } from "@core/tasks/types.js";
import { ITaskCatalogResponse, ITrainingTemplate, ITrainingRun, TrainingRunId } from "@core/training/types.js";
import { TrainingCatalogResponseDTO } from "@dto/trainings.dto.js";
import { ITrainingSubmitSolutionRequestDTO, ITrainingsRunSubmitSolutionResponseDTO } from "@dto/trainingRuns.dto.js";
import { PlaygroundSubmitRequestDTO, IPlaygroundSubmitResponseDTO } from "@dto/playground.dto.js";

export interface ITaskService {
  getById(taskId: TaskId): Task | undefined;
  getManyByIds(taskIds: TaskId[]): Task[];
  getByDifficulty(difficulty: Difficulty): Task[];
  getByTopic(topicId: TopicId): Task[];
  getAll(): Task[];
}

export type TaskQueryFilter = {
  difficulty?: Difficulty;
  moduleId?: ModuleId;
  sectionId?: SectionId;
  topicId?: TopicId;
  limit?: number;
};

export interface ITaskAggregatedService {
  getCatalog(): ITaskCatalogResponse;
  query(filter: TaskQueryFilter): Task[];
  getByModule(moduleId: ModuleId): Task[];
  getBySection(sectionId: SectionId): Task[];
  getByTopic(topicId: TopicId): Task[];
}

export interface ITrainingTemplateService {
  getById(id: string): ITrainingTemplate;
  validateTemplatesOnStartup(): void;
  getCatalogView(): TrainingCatalogResponseDTO;
}

export interface ITrainingsRunService {
  startFixedTraining(templateId: string): ITrainingRun;
  handleSolution(
    trainingRunIn: TrainingRunId,
    dto: ITrainingSubmitSolutionRequestDTO
  ): Promise<ITrainingsRunSubmitSolutionResponseDTO>;
  getRunById(trainingRunId: TrainingRunId): Promise<ITrainingRun>;
}

export interface IPlaygroundService {
  submit(dto: PlaygroundSubmitRequestDTO): Promise<IPlaygroundSubmitResponseDTO>;
}
