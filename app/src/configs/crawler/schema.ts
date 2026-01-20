import { z } from "zod";

export const crawlerSchema = z
  .object({
    CRAWLER_CONCURRENCY: z.coerce.number().int().positive().default(1),
    CRAWLER_HEADLESS: z.coerce.boolean().default(true),
  })
  .transform((env) => ({
    concurrency: env.CRAWLER_CONCURRENCY,
    headless: env.CRAWLER_HEADLESS,
  }));
