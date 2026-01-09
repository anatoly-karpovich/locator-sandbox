import { registerSchema, validateJsonSchema } from "./schemaValidator.js";
import { errorResponseSchema } from "./schemas/errorResponseSchema.js";
import {
  studyMaterialSchema,
  expectationsSchema,
  usageSpecSchema,
  taskSchema,
  taskResponseSchema,
  tasksCatalogSchema,
} from "./schemas/taskSchemas.js";
import {
  compareResultSchema,
  trainingTaskResultSchema,
  trainingRunSchema,
  trainingRunResponseSchema,
  trainingRunSubmitSchema,
  trainingsCatalogSchema,
} from "./schemas/trainingSchemas.js";
import { playgroundSubmitSchema } from "./schemas/playgroundSchemas.js";
import { TestTag } from "./tags.js";

export function registerApiSchemas(): void {
  registerSchema(errorResponseSchema);
  registerSchema(studyMaterialSchema);
  registerSchema(expectationsSchema);
  registerSchema(usageSpecSchema);
  registerSchema(taskSchema);
  registerSchema(taskResponseSchema);
  registerSchema(tasksCatalogSchema);
  registerSchema(compareResultSchema);
  registerSchema(trainingTaskResultSchema);
  registerSchema(trainingRunSchema);
  registerSchema(trainingRunResponseSchema);
  registerSchema(trainingRunSubmitSchema);
  registerSchema(trainingsCatalogSchema);
  registerSchema(playgroundSubmitSchema);
}

export { validateJsonSchema };
export { TestTag };
export {
  errorResponseSchema,
  taskResponseSchema,
  tasksCatalogSchema,
  trainingsCatalogSchema,
  trainingRunResponseSchema,
  trainingRunSubmitSchema,
  playgroundSubmitSchema,
};
