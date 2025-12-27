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

export async function fetchCurriculum(params?: Record<string, string | number | boolean | undefined>): Promise<CurriculumResponse> {
  const query = params
    ? "?" +
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&")
    : "";
  const res = await fetch(`/api/curriculum${query}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<CurriculumResponse>;
}
