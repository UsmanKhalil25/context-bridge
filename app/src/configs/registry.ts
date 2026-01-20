import type { Config } from "./types";

class ConfigRegistry {
  private configs = new Map<string, Config<any>>();

  private getAll() {
    return Array.from(this.configs.values());
  }

  register<S extends Config<any>>(module: S) {
    if (this.configs.has(module.name)) {
      throw new Error(`Config "${module.name}" already registered`);
    }
    this.configs.set(module.name, module);
  }

  initConfigs(env: Record<string, string | undefined>) {
    const result: Record<string, unknown> = {};

    try {
      for (const module of this.getAll()) {
        result[module.name] = module.load(env);
      }
    } catch (error) {
      console.error({ error });
      process.exit(1);
    }

    return Object.freeze(result);
  }
}

export const configRegistry = new ConfigRegistry();
