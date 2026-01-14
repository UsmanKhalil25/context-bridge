import { z } from "zod";
import { Config } from "./types";

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default("0.0.0.0"),
});

type AppEnv = z.infer<typeof schema>;

export type AppConfig = {
  port: number;
  host: string;
};

export const appConfig: Config<AppEnv, AppConfig> = {
  name: "app",
  schema,
  load(env) {
    const parsed = schema.parse(env);
    return {
      port: parsed.PORT,
      host: parsed.HOST,
    };
  },
};
