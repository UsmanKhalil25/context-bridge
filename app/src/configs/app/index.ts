import { z } from "zod";

import { Config } from "../types";
import { appSchema as schema } from "./schema";

export type AppEnv = z.input<typeof schema>;
export type AppConfig = z.output<typeof schema>;

export const appConfig: Config<typeof schema> = {
  name: "app",
  schema,
  load(env) {
    return schema.parse(env);
  },
};
