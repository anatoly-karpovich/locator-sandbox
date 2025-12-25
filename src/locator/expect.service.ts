import { Locator } from "playwright";
import { Expectations } from "../tasks/types";

interface LocatorState extends Record<keyof Required<Expectations>, (locator: Locator) => Promise<unknown>> {}
export class LocatorStateService implements LocatorState {
  async getActual(locator: Locator, expectations: Expectations) {
    const keys = Object.keys(expectations) as (keyof Expectations)[];
    const state = await Promise.all(keys.map((key) => this[key](locator)));
    const result = keys.reduce((acc, key, i) => {
      acc[key] = state[i];
      return acc;
    }, {} as Record<keyof Expectations, unknown>);
    keys.forEach((key, i) => (result[key] = state[i]));
    return result;
  }

  async count(locator: Locator) {
    return await locator.count();
  }

  async visible(locator: Locator) {
    return await locator.isVisible();
  }

  async text(locator: Locator) {
    return await locator.textContent();
  }
}
