import { Locator } from "playwright";
import { Expectations, ExpectationsValues } from "../../core/tasks/types";

interface LocatorState
  extends Record<keyof Required<Expectations>, (locator: Locator) => Promise<ExpectationsValues>> {}

export class LocatorStateService implements LocatorState {
  async getActual(
    locator: Locator,
    expectations: Expectations
  ): Promise<Record<keyof Expectations, ExpectationsValues>> {
    const keys = Object.keys(expectations) as (keyof Expectations)[];
    const state = await Promise.all(keys.map((key) => this[key](locator)));
    const result = keys.reduce((acc, key, i) => {
      acc[key] = state[i];
      return acc;
    }, {} as Record<keyof Expectations, ExpectationsValues>);
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

  async hidden(locator: Locator) {
    return await locator.isHidden();
  }

  async enabled(locator: Locator) {
    return await locator.isEnabled();
  }

  async editable(locator: Locator) {
    return await locator.isEditable();
  }

  async checked(locator: Locator) {
    return await locator.isChecked();
  }
}
