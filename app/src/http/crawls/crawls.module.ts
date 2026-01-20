import { Hono } from "hono";

import { IBaseModule } from "../base";
import { CrawlsController } from "./crawls.controller";
import { CrawlsService } from "./crawls.service";
import { CrawlsQueue } from "./crawls.queue";
import { CrawlsWorker } from "./crawls.worker";

export class CrawlsModule implements IBaseModule {
  public readonly path = "crawls";

  public readonly crawlsQueue: CrawlsQueue;
  public readonly crawlsService: CrawlsService;
  public readonly crawlsController: CrawlsController;
  public readonly crawlsWorker: CrawlsWorker;

  constructor() {
    this.crawlsQueue = this.createQueue();
    this.crawlsService = this.createService();
    this.crawlsController = this.createController(
      this.crawlsService,
      this.crawlsQueue,
    );
    this.crawlsWorker = this.createWorker(
      this.crawlsService,
      this.crawlsQueue,
      concurrency,
    );
  }

  private createQueue() {
    return new CrawlsQueue();
  }

  private createService() {
    return new CrawlsService();
  }

  private createController(service: CrawlsService, queue: CrawlsQueue) {
    return new CrawlsController(service, queue);
  }

  private createWorker(
    service: CrawlsService,
    queue: CrawlsQueue,
    concurrency: number,
  ) {
    return new CrawlsWorker(service, queue, concurrency);
  }

  public get router(): Hono {
    return this.crawlsController.app;
  }
}
