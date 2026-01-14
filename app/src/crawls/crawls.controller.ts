import { Hono } from "hono";

export class CrawlsController {
  public app: Hono;

  constructor() {
    this.app = new Hono();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.app.post("/", async (c) => {
      const body = await c.req.json();
      const url = body.url;

      if (!url) return c.json({ error: "URL is required" }, 400);

      console.log(`Starting crawler for ${url}`);

      return c.json({ message: `Crawling started for ${url}` }, 201);
    });

    this.app.get("/status", (c) => {
      return c.json({ status: "Crawler module is running" });
    });
  }
}
