import type { Task, TaskMap, SubmitSolutionBody, SolutionResponse, CurriculumResponse } from "./types";

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchTasks(): Promise<TaskMap> {
  const res = await fetch("/api/tasks");
  const data = await handleJson<{ tasks: TaskMap }>(res);
  return data.tasks;
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`);
  const data = await handleJson<{ task: Task }>(res);
  return data.task;
}

export async function submitSolution(body: SubmitSolutionBody): Promise<SolutionResponse> {
  const res = await fetch("/api/solutions", {
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

export async function fetchCurriculum(): Promise<CurriculumResponse> {
  const res = await fetch("/api/curriculum");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<CurriculumResponse>;
}
