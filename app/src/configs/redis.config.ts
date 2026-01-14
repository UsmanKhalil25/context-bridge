import { z } from "zod";
import { Config } from "./types";

const schema = z.object({
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().int().positive(),
  REDIS_PASSSWORD: z.string(),
  REDIST_DB: z.string(),
});

type RedisEnv = z.infer<typeof schema>;

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
  db: string;
};

export const redisConfig: Config<RedisEnv, RedisConfig> = {
  name: "redis",
  schema,
  load(env) {
    const parsed = schema.parse(env);
    return {
      host: parsed.REDIS_HOST,
      port: parsed.REDIS_PORT,
      password: parsed.REDIS_PASSSWORD,
      db: parsed.REDIST_DB,
    };
  },
};
