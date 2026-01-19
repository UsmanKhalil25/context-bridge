import { Hono } from "hono";

import { IBaseModule } from "../base";
import { CrawlsController } from "./crawls.controller";
import { CrawlsService } from "./crawls.service";

export class CrawlsModule implements IBaseModule {
  public readonly path = "crawls";

  private readonly controller: CrawlsController;
  private readonly service: CrawlsService;

  constructor() {
    this.service = new CrawlsService();
    this.controller = new CrawlsController(this.service);
  }

  public get router(): Hono {
    return this.controller.app;
  }
}
