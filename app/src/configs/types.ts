import type { ZodSchema } from "zod";

export type Config<T, U> = {
  name: string;
  schema: ZodSchema<T>;
  load: (env: Record<string, string | undefined>) => U;
};
