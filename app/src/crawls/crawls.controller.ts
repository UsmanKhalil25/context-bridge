import * as z from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { CrawlsService } from "./crawls.service";

export class CrawlsController {
  public app: Hono;

  constructor(private readonly crawlsService: CrawlsService) {
    this.app = new Hono();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.app.post(
      "/",
      zValidator(
        "json",
        z.object({
          url: z.string().url(),
        }),
      ),
      async (c) => {
        const validated = c.req.valid("json");
        const url = validated.url;

        await this.crawlsService.crawl(url);

        return c.json({ message: `Crawling started for ${url}` }, 201);
      },
    );
  }
}
