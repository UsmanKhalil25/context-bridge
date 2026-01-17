import { configRegistry } from "./registry";
import { appConfig, redisConfig } from "./configs";

(function registerConfigs() {
  configRegistry.register(redisConfig);
  configRegistry.register(appConfig);
})();

export const configs = configRegistry.initConfigs(Bun.env);
