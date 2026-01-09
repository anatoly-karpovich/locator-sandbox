import { expect } from "@playwright/test";
import { Ajv } from "ajv";

const ajv = new Ajv({ allErrors: true });

type SchemaWithId = { $id: string } & object;

export function registerSchema(schema: SchemaWithId): void {
  if (!ajv.getSchema(schema.$id)) {
    ajv.addSchema(schema);
  }
}

export function validateJsonSchema(body: object, schema: object): void {
  const validate = ajv.compile(schema);
  const isValid = validate(body);

  expect.soft(isValid, "Response body should match JSON schema").toBe(true);

  if (!isValid) {
    console.log(validate.errors);
  }
}
