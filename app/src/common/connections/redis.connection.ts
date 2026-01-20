import type { RedisOptions } from "ioredis";

import { configs } from "../../configs";

export const createRedisConnection = (): RedisOptions => ({
  host: configs.redis.host,
  port: configs.redis.port,
  password: configs.redis.password,
  db: configs.redis.db,
  maxRetriesPerRequest: null,
});
