const difficultyEnum = ["beginner", "intermediate", "advanced"] as const;
const runStatusEnum = ["not_started", "in_progress", "completed"] as const;
const taskStatusEnum = ["not_started", "in_progress", "passed", "passed_with_notes", "failed"] as const;

export const compareResultSchema = {
  $id: "compareResult",
  type: "object",
  properties: {
    passed: { type: "boolean" },
    checks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          expected: {},
          actual: {},
          passed: { type: "boolean" },
        },
        required: ["key", "expected", "passed"],
        additionalProperties: true,
      },
    },
  },
  required: ["passed", "checks"],
  additionalProperties: false,
} as const;

export const trainingTaskResultSchema = {
  $id: "trainingTaskResult",
  type: "object",
  properties: {
    status: { type: "string", enum: taskStatusEnum },
    attempts: { type: "number" },
    lastAttempt: {
      anyOf: [
        { type: "null" },
        {
          type: "object",
          properties: {
            result: { $ref: "compareResult" },
            explanation: { type: "array", items: { type: "string" } },
            payload: { type: "string" },
            createdAt: { type: "string" },
          },
          required: ["result", "createdAt"],
          additionalProperties: false,
        },
      ],
    },
  },
  required: ["status", "attempts", "lastAttempt"],
  additionalProperties: false,
} as const;

export const trainingRunSchema = {
  $id: "trainingRun",
  type: "object",
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["template", "custom"] },
    status: { type: "string", enum: runStatusEnum },
    title: { type: "string" },
    templateId: { type: "string" },
    createdAt: { type: "string" },
    userId: { type: "string" },
    topics: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          tasks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                result: { $ref: "trainingTaskResult" },
              },
              required: ["id", "title", "result"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "title", "tasks"],
        additionalProperties: false,
      },
    },
  },
  required: ["id", "type", "status", "topics", "createdAt"],
  additionalProperties: false,
} as const;

export const trainingRunResponseSchema = {
  $id: "trainingRunResponse",
  type: "object",
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["template", "custom"] },
    status: { type: "string", enum: runStatusEnum },
    title: { type: "string" },
    templateId: { type: "string" },
    createdAt: { type: "string" },
    userId: { type: "string" },
    topics: { $ref: "trainingRun#/properties/topics" },
  },
  required: ["id", "type", "status", "topics", "createdAt"],
  additionalProperties: false,
} as const;

export const trainingRunSubmitSchema = {
  $id: "trainingRunSubmit",
  type: "object",
  properties: {
    result: { $ref: "compareResult" },
    explanation: { type: "array", items: { type: "string" } },
  },
  required: ["result"],
  additionalProperties: false,
} as const;

export const trainingsCatalogSchema = {
  $id: "trainingsCatalog",
  type: "object",
  properties: {
    catalog: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          trainings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                difficulty: { type: "string", enum: difficultyEnum },
                taskCount: { type: "number" },
              },
              required: ["id", "title", "difficulty", "taskCount"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "title", "trainings"],
        additionalProperties: false,
      },
    },
  },
  required: ["catalog"],
  additionalProperties: false,
} as const;
