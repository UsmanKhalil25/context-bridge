import { Queue } from "bullmq";

import { CrawlJobData } from "./interfaces";
import { createRedisConnection } from "../../common/connections";
import { RedisOptions } from "ioredis";

export class CrawlsQueue {
  public readonly name = "crawls";

  public queue: Queue;
  public connection: RedisOptions;

  constructor() {
    this.connection = createRedisConnection();
    this.queue = new Queue(this.name, { connection: this.connection });
  }

  addJob(data: CrawlJobData) {
    return this.queue.add(this.name, data);
  }
}
