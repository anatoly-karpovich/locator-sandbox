import { TopicId } from "../../core/tasks/types";
import { ITrainingRun, TrainingRunId } from "../../core/training/types";
import { TopicRepository, TrainingRunsRepository } from "../../repositories";
import { TaskService } from "../task/task.service";
import { TrainingTemplateService } from "./trainingTemplate.service";
import { LocatorExecutor } from "../../core/locator/locatorExecutor";
import { TRAINING_RUN_STATUS, TRAINING_RUN_TASK_STATUS } from "../../core/training/enums";
import { ITrainingSubmitSolutionRequestDTO } from "../../dto/trainingRuns.dto";

export class TrainingsRunService {
  constructor(
    private locatorExecutionService: LocatorExecutor = new LocatorExecutor(),
    private trainingTemplateService: TrainingTemplateService = new TrainingTemplateService(),
    private taskService: TaskService = new TaskService(),
    private trainingRunsRepository: TrainingRunsRepository = new TrainingRunsRepository(),
    private topicsRepository: TopicRepository = new TopicRepository()
  ) {}
  startFixedTraining(templateId: string): ITrainingRun {
    const template = this.trainingTemplateService.getById(templateId);

    const tasks = this.taskService.getManyByIds(template.taskIds);

    // 1️⃣ группируем таски по topicId
    const tasksByTopic = new Map<TopicId, typeof tasks>();

    for (const task of tasks) {
      if (!tasksByTopic.has(task.topicId)) {
        tasksByTopic.set(task.topicId, []);
      }
      tasksByTopic.get(task.topicId)!.push(task);
    }

    // 2️⃣ собираем topics DTO
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

  // startCustomTraining(params: { difficulty?: string; scope?: Partial<Task["scope"]>; limit: number }): ITrainingSet {
  //   const tasks = taskService.query({
  //     difficulty: params.difficulty,
  //     scope: params.scope,
  //     limit: params.limit,
  //   });

  //   if (tasks.length === 0) {
  //     throw new Error("No tasks found for given parameters");
  //   }

  //   return {
  //     id: generateUUID(),
  //     source: "custom",
  //     taskIds: tasks.map((t) => t.id),
  //     createdAt: new Date().toISOString(),
  //   };
  // }

  async handleSolution(trainingRunIn: TrainingRunId, dto: ITrainingSubmitSolutionRequestDTO) {
    const run = this.trainingRunsRepository.getById(trainingRunIn);
    if (!run) throw new Error(`Training run "${trainingRunIn}" not found`);

    const task = this.taskService.getById(dto.taskId);
    if (!task) throw new Error(`Task "${dto.taskId}" not found`);

    const taskEntry = this.findTask(run, dto.taskId);
    if (!taskEntry) throw new Error(`Task "${dto.taskId}" not found in run "${trainingRunIn}"`);

    const execution = await this.locatorExecutionService.execute(task, dto.payload);
    const passed = Boolean(execution.result?.passed);

    taskEntry.result.attempts += 1;
    if (passed) {
      taskEntry.result.status = TRAINING_RUN_TASK_STATUS.PASSED;
    } else {
      taskEntry.result.status =
        taskEntry.result.attempts === 1 ? TRAINING_RUN_TASK_STATUS.IN_PROGRESS : TRAINING_RUN_TASK_STATUS.FAILED;
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

    if (allTasks.every((t) => t.result.status === TRAINING_RUN_TASK_STATUS.PASSED)) {
      run.status = TRAINING_RUN_STATUS.COMPLETED;
    } else {
      run.status = TRAINING_RUN_STATUS.IN_PROGRESS;
    }
  }
  /*
  handleSolution(dto) {
  const run = runRepo.getById(dto.runId);
  if (!run) throw new Error("Run not found");

  const taskRun = run.tasks.find(t => t.taskId === dto.taskId);
  if (!taskRun) throw new Error("Task not in run");

  // 1. Execution
  const executionResult = locatorExecutionService.execute(task, dto.payload);

  // 2. Usage validation
  const usageResult = usageValidationService.validate(task, dto.payload);

  // 3. Итог
  const passed = executionResult.passed && usageResult.passed;

  // 4. Обновляем состояние
  taskRun.attempts += 1;
  taskRun.lastSubmittedAt = now();

  if (passed) {
    taskRun.status = "passed";
  } else {
    taskRun.status =
      taskRun.status === "not_started"
        ? "in_progress"
        : "failed";
  }

  run.updatedAt = now();

  // 5. Persist
  runRepo.save(run);

  return {
    passed,
    executionResult,
    usageResult,
    taskStatus: taskRun.status,
  };
}
  */
}
