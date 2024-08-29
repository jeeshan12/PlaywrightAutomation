import test from "@playwright/test";

export function step(stepName?: string) {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext,
  ) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return function replacementMethod(...args: any) {
      const name =
        stepName || `${this.constructor.name}.${context.name as string}`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
