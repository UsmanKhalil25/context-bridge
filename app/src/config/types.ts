import type { ZodType } from "zod";

export type Config<T, U> = {
  name: string;
  schema: ZodType<T>;
  load: (env: Record<string, string | undefined>) => U;
};
