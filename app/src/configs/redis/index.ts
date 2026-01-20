import { z } from "zod";

import { Config } from "../types";
import { redisSchema as schema } from "./schema";

export type RedisEnv = z.input<typeof schema>;
export type RedisConfig = z.output<typeof schema>;

export const redisConfig: Config<typeof schema> = {
  name: "redis",
  schema,
  load(env) {
    return schema.parse(env);
  },
};
