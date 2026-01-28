const difficultyEnum = ["beginner", "intermediate", "advanced"] as const;

export const studyMaterialSchema = {
  $id: "studyMaterial",
  type: "object",
  properties: {
    title: { type: "string" },
    url: { type: "string" },
  },
  required: ["title", "url"],
  additionalProperties: false,
} as const;

export const expectationsSchema = {
  $id: "expectations",
  type: "object",
  properties: {
    count: { type: "number" },
    visible: { type: "boolean" },
    text: { type: "string" },
    hidden: { type: "boolean" },
    enabled: { type: "boolean" },
    editable: { type: "boolean" },
    checked: { type: "boolean" },
  },
  additionalProperties: false,
} as const;

export const usageSpecSchema = {
  $id: "usageSpec",
  type: "object",
  properties: {
    method: { type: "string" },
    argument: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["string", "regex"] },
      },
      required: ["type"],
      additionalProperties: false,
    },
    options: { type: "object" },
  },
  required: ["method"],
  additionalProperties: false,
} as const;

export const taskSchema = {
  $id: "task",
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    topicId: { type: "string" },
    difficulty: { type: "string", enum: difficultyEnum },
    studyMaterials: {
      type: "array",
      items: { $ref: "studyMaterial" },
    },
    html: { type: "string" },
    expectations: { $ref: "expectations" },
    usageSpec: { $ref: "usageSpec" },
    heuristics: { type: "array", items: { type: "string" } },
  },
  required: ["id", "title", "description", "topicId", "difficulty", "studyMaterials", "html", "expectations"],
  additionalProperties: false,
} as const;

export const taskResponseSchema = {
  $id: "taskResponse",
  type: "object",
  properties: {
    task: { $ref: "task" },
  },
  required: ["task"],
  additionalProperties: false,
} as const;

export const tasksCatalogSchema = {
  $id: "tasksCatalog",
  type: "object",
  properties: {
    modules: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                topics: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      title: { type: "string" },
                      taskCount: { type: "number" },
                      difficulties: {
                        type: "array",
                        items: { type: "string", enum: difficultyEnum },
                      },
                      hasUsageSpec: { type: "boolean" },
                    },
                    required: ["id", "title", "taskCount", "difficulties", "hasUsageSpec"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["id", "title", "topics"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "title", "sections"],
        additionalProperties: false,
      },
    },
  },
  required: ["modules"],
  additionalProperties: false,
} as const;
