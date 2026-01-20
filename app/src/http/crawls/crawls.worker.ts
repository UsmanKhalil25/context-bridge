import { Worker, Job } from "bullmq";

import { CrawlJobData } from "./interfaces";
import { CrawlsQueue } from "./crawls.queue";
import { CrawlsService } from "./crawls.service";

export class CrawlsWorker {
  private worker: Worker;

  constructor(
    private readonly crawlsService: CrawlsService,
    private readonly crawlsQueue: CrawlsQueue,
    private readonly concurrency = 1,
  ) {
    this.worker = new Worker(
      this.crawlsQueue.name,
      async (job: Job<CrawlJobData>) => {
        console.log(`Processing job ${job.id} for URL: ${job.data.url}`);
        await this.crawlsService.crawl(job.data.url);
        console.log(`Job ${job.id} finished`);
      },
      {
        connection: this.crawlsQueue.connection,
        concurrency: this.concurrency,
      },
    );

    this.registerEvents();
  }

  private registerEvents() {
    this.worker.on("completed", (job) => {
      console.log(`Job completed: ${job.id}`);
    });

    this.worker.on("failed", (job, err) => {
      console.error(`Job failed: ${job?.id}`, err);
    });
  }

  public async close() {
    await this.worker.close();
  }
}
