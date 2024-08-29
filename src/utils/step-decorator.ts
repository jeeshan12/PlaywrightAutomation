import test from "@playwright/test";

export function step(stepName?: string) {
  return function decorator(
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
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
