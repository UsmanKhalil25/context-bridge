import { configRegistry } from "./registry";
import { redisConfig, appConfig } from "./configs";
import type { AppConfig, RedisConfig } from "./configs";

configRegistry.register(redisConfig);
configRegistry.register(appConfig);

const allConfigs = configRegistry.initConfigs(Bun.env);

export const configs = {
  app: allConfigs.app as AppConfig,
  redis: allConfigs.redis as RedisConfig,
} as const;
