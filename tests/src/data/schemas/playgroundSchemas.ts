export const playgroundSubmitSchema = {
  $id: "playgroundSubmit",
  type: "object",
  properties: {
    explanation: { type: "array", items: { type: "string" } },
    elements: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tagName: { type: "string" },
          text: { type: ["string", "null"] },
          attributes: { type: "object" },
          visible: { type: "boolean" },
        },
        required: ["tagName", "text", "attributes", "visible"],
        additionalProperties: false,
      },
    },
  },
  required: ["elements"],
  additionalProperties: false,
} as const;
