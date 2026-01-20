import { z } from "zod";

export const appSchema = z
  .object({
    PORT: z.coerce.number().int().positive().default(3000),
    HOST: z.string().default("0.0.0.0"),
  })
  .transform((env) => ({
    port: env.PORT,
    host: env.HOST,
  }));
