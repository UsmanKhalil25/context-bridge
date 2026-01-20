import * as z from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { IBaseController } from "../base";
import { CrawlsService } from "./crawls.service";
import { CrawlsQueue } from "./crawls.queue";

export class CrawlsController implements IBaseController {
  public app: Hono;

  constructor(
    private readonly crawlsService: CrawlsService,
    private readonly crawlsQueue: CrawlsQueue,
  ) {
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

        await this.crawlsQueue.addJob({ url });

        return c.json({ message: `Crawl job enqueued for ${url}` }, 201);
      },
    );
  }
}
