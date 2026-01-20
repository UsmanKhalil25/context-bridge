import { configRegistry } from "./registry";

import { type AppConfig, appConfig } from "./app";
import { type RedisConfig, redisConfig } from "./redis";
import { type CrawlerConfig, crawlerConfig } from "./crawler";

configRegistry.register(appConfig);
configRegistry.register(crawlerConfig);
configRegistry.register(redisConfig);

const allConfigs = configRegistry.initConfigs(Bun.env);

export const configs = {
  app: allConfigs.app as AppConfig,
  redis: allConfigs.redis as RedisConfig,
  crawler: allConfigs.crawler as CrawlerConfig,
} as const;
