import { z } from "zod";

import { Config } from "../types";
import { crawlerSchema as schema } from "./schema";

export type CrawlerEnv = z.input<typeof schema>;
export type CrawlerConfig = z.output<typeof schema>;

export const crawlerConfig: Config<typeof schema> = {
  name: "crawler",
  schema,
  load(env) {
    return schema.parse(env);
  },
};
