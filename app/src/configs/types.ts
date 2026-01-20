import type { ZodTypeAny, input, output } from "zod";

export type Config<S extends ZodTypeAny> = {
  name: string;
  schema: S;
  load: (env: input<S>) => output<S>;
};
