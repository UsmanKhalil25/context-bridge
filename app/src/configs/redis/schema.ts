import { z } from "zod";

export const redisSchema = z
  .object({
    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.coerce.number().int().positive(),
    REDIS_PASSWORD: z.string(),
    REDIS_DB: z.coerce.number().int(),
  })
  .transform((env) => ({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    db: env.REDIS_DB,
  }));
