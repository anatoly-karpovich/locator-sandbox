export const errorResponseSchema = {
  $id: "errorResponse",
  type: "object",
  properties: {
    error: { type: "string" },
  },
  required: ["error"],
  additionalProperties: false,
} as const;
