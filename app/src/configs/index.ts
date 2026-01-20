import { configRegistry } from "./registry";
import { type AppConfig, appConfig } from "./app";
import { type RedisConfig, redisConfig } from "./redis";

configRegistry.register(redisConfig);
configRegistry.register(appConfig);

const allConfigs = configRegistry.initConfigs(Bun.env);

export const configs = {
  app: allConfigs.app as AppConfig,
  redis: allConfigs.redis as RedisConfig,
} as const;
