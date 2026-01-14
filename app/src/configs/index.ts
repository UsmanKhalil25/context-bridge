import { configRegistry } from "./registry";
import { redisConfig } from "./redis.config";
import { appConfig } from "./app.config";

function registerConfigs() {
  configRegistry.register(redisConfig);
  configRegistry.register(appConfig);
}

function initConfigs() {
  const env = Bun.env;
  const result: Record<string, unknown> = {};

  try {
    for (const module of configRegistry.getAll()) {
      result[module.name] = module.load(env);
    }
  } catch (error) {
    console.error({ error });
    process.exit(1);
  }

  return Object.freeze(result);
}

registerConfigs();

export const configs = initConfigs();
export type AppConfig = typeof configs;
