import * as z from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

export class CrawlsController {
  public app: Hono;

  constructor() {
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
      (c) => {
        const validated = c.req.valid("json");
        const url = validated.url;

        console.log(`Starting crawler for ${url}`);

        return c.json({ message: `Crawling started for ${url}` }, 201);
      },
    );
  }
}
