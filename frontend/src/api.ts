import type {
  Task,
  TaskMap,
  SubmitSolutionBody,
  SolutionResponse,
  TrainingCatalogResponse,
  TrainingRun,
} from "./types";
import type { PlaygroundSubmitRequest, PlaygroundSubmitResponse } from "./types";
import { getCorrelationId } from "./core/correlationId";

export class HttpError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(body || `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    if (res.status >= 400 && res.status < 500) {
      const json = await res.json();
      throw new HttpError(res.status, json.error || res.statusText);
    } else {
      const text = await res.text();
      throw new HttpError(res.status, text || res.statusText);
    }
  }
  return res.json() as Promise<T>;
}

async function fetchApi(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has("x-request-id")) {
    headers.set("x-request-id", getCorrelationId());
  }
  return fetch(input, { ...init, headers });
}

export async function fetchTasks(): Promise<TaskMap> {
  const res = await fetchApi("/api/tasks");
  const data = await handleJson<{ tasks: TaskMap }>(res);
  return data.tasks;
}

export async function fetchTask(id: string): Promise<Task> {
  const res = await fetchApi(`/api/tasks/${id}`);
  const data = await handleJson<{ task: Task }>(res);
  return data.task;
}

export async function submitSolution(body: SubmitSolutionBody): Promise<SolutionResponse> {
  const res = await fetchApi("/api/solutions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<SolutionResponse>;
}

export async function fetchTrainingsCatalog(): Promise<TrainingCatalogResponse> {
  const res = await fetchApi("/api/trainings/catalog");
  return handleJson<TrainingCatalogResponse>(res);
}

export async function startTrainingRun(trainingTemplateId: string): Promise<TrainingRun> {
  const res = await fetchApi("/api/training-runs/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "type": "fixed", trainingTemplateId }),
  });
  return handleJson<TrainingRun>(res);
}

export async function fetchTrainingRun(trainingRunId: string): Promise<TrainingRun> {
  const res = await fetchApi(`/api/training-runs/${trainingRunId}`);
  return handleJson<TrainingRun>(res);
}

export async function submitTrainingRunSolution(
  trainingRunId: string,
  body: SubmitSolutionBody
): Promise<SolutionResponse> {
  const res = await fetchApi(`/api/training-runs/${trainingRunId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleJson<SolutionResponse>(res);
}

export async function submitPlayground(body: PlaygroundSubmitRequest): Promise<PlaygroundSubmitResponse> {
  const res = await fetchApi("/api/playground/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleJson<PlaygroundSubmitResponse>(res);
}
