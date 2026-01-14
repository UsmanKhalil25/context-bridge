import type { Config } from "./types";

class ConfigRegistry {
  private configs = new Map<string, Config<unknown, unknown>>();

  register<EnvVars, ResolvedConfig>(module: Config<EnvVars, ResolvedConfig>) {
    if (this.configs.has(module.name)) {
      throw new Error(`Config "${module.name}" already registered`);
    }

    this.configs.set(module.name, module);
  }

  getAll() {
    return Array.from(this.configs.values());
  }
}

export const configRegistry = new ConfigRegistry();
