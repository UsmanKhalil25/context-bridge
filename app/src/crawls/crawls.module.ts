import { CrawlsController } from "./crawls.controller";
import { Hono } from "hono";

export class CrawlsModule {
  public readonly path = "crawls";
  public controller: CrawlsController;

  constructor() {
    this.controller = new CrawlsController();
  }

  public get router(): Hono {
    return this.controller.app;
  }
}
