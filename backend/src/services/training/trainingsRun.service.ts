import { inject, injectable } from "inversify";
import { TopicId } from "@core/tasks/types.js";
import { ITrainingRun, TrainingRunId } from "@core/training/types.js";
import { ITopicRepository, ITrainingRunsRepository } from "@repositories/index.js";
import { ITaskService, ITrainingTemplateService, ITrainingsRunService } from "@services/types.js";
import { ILocatorExecutor } from "@core/types.js";
import { TRAINING_RUN_STATUS, TRAINING_RUN_TASK_STATUS } from "@core/training/enums.js";
import {
  ITrainingSubmitSolutionRequestDTO,
  ITrainingsRunSubmitSolutionResponseDTO,
} from "@dto/trainingRuns.dto.js";
import { TYPES } from "../../container/types.js";

@injectable()
export class TrainingsRunService implements ITrainingsRunService {
  constructor(
    @inject(TYPES.LocatorExecutor) private locatorExecutionService: ILocatorExecutor,
    @inject(TYPES.TrainingTemplateService) private trainingTemplateService: ITrainingTemplateService,
    @inject(TYPES.TaskService) private taskService: ITaskService,
    @inject(TYPES.TrainingRunsRepository) private trainingRunsRepository: ITrainingRunsRepository,
    @inject(TYPES.TopicRepository) private topicsRepository: ITopicRepository
  ) {}

  startFixedTraining(templateId: string): ITrainingRun {
    const template = this.trainingTemplateService.getById(templateId);

    const tasks = this.taskService.getManyByIds(template.taskIds);

    const tasksByTopic = new Map<TopicId, typeof tasks>();

    for (const task of tasks) {
      if (!tasksByTopic.has(task.topicId)) {
        tasksByTopic.set(task.topicId, []);
      }
      tasksByTopic.get(task.topicId)!.push(task);
    }

    const topics = Array.from(tasksByTopic.entries()).map(([topicId, topicTasks]) => {
      const topic = this.topicsRepository.getById(topicId);

      if (!topic) {
        throw new Error(`Topic ${topicId} not found for training`);
      }
      return {
        id: topic.id,
        title: topic.title,
        tasks: topicTasks.map((task) => ({
          id: task.id,
          title: task.title,
          result: {
            status: TRAINING_RUN_TASK_STATUS.NOT_STARTED,
            attempts: 0,
            lastAttempt: null,
          },
        })),
      };
    });

    const data: Omit<ITrainingRun, "id"> = {
      type: "template",
      title: template.title,
      status: TRAINING_RUN_STATUS.NOT_STARTED,
      templateId: template.id,
      topics,
      createdAt: new Date().toISOString(),
    };

    const run = this.trainingRunsRepository.create(data);
    return run;
  }

  async handleSolution(
    trainingRunIn: TrainingRunId,
    dto: ITrainingSubmitSolutionRequestDTO
  ): Promise<ITrainingsRunSubmitSolutionResponseDTO> {
    const run = this.trainingRunsRepository.getById(trainingRunIn);
    if (!run) throw new Error(`Training run "${trainingRunIn}" not found`);

    const task = this.taskService.getById(dto.taskId);
    if (!task) throw new Error(`Task "${dto.taskId}" not found`);

    const taskEntry = this.findTask(run, dto.taskId);
    if (!taskEntry) throw new Error(`Task "${dto.taskId}" not found in run "${trainingRunIn}"`);

    const execution = await this.locatorExecutionService.execute(task, dto.payload);
    const passed = Boolean(execution.result?.passed);
    const hasNotes = Boolean(execution.explanation && execution.explanation.length > 0);
    const previousStatus = taskEntry.result.status;
    const alreadyPassed =
      previousStatus === TRAINING_RUN_TASK_STATUS.PASSED ||
      previousStatus === TRAINING_RUN_TASK_STATUS.PASSED_WITH_NOTES;

    taskEntry.result.attempts += 1;
    taskEntry.result.lastAttempt = {
      result: execution.result,
      explanation: execution.explanation,
      payload: dto.payload,
      createdAt: new Date().toISOString(),
    };

    if (passed) {
      const nextStatus = hasNotes
        ? TRAINING_RUN_TASK_STATUS.PASSED_WITH_NOTES
        : TRAINING_RUN_TASK_STATUS.PASSED;
      if (previousStatus !== TRAINING_RUN_TASK_STATUS.PASSED) {
        taskEntry.result.status = nextStatus;
      }
    } else if (!alreadyPassed) {
      taskEntry.result.status = TRAINING_RUN_TASK_STATUS.IN_PROGRESS;
    }
    this.updateRunStatus(run);
    this.trainingRunsRepository.update(trainingRunIn, run);
    return execution;
  }

  async getRunById(trainingRunId: TrainingRunId) {
    const run = this.trainingRunsRepository.getById(trainingRunId);
    if (!run) throw new Error(`Training run "${trainingRunId}" not found`);
    return run;
  }

  private findTask(run: ITrainingRun, taskId: string) {
    for (const topic of run.topics) {
      const task = topic.tasks.find((t) => t.id === taskId);
      if (task) return task;
    }
    return null;
  }

  private updateRunStatus(run: ITrainingRun) {
    const allTasks = run.topics.flatMap((t) => t.tasks);

    if (
      allTasks.every(
        (t) =>
          t.result.status === TRAINING_RUN_TASK_STATUS.PASSED ||
          t.result.status === TRAINING_RUN_TASK_STATUS.PASSED_WITH_NOTES
      )
    ) {
      run.status = TRAINING_RUN_STATUS.COMPLETED;
    } else {
      run.status = TRAINING_RUN_STATUS.IN_PROGRESS;
    }
  }
}
