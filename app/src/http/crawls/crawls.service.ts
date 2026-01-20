import { Crawler } from "core";

import { CrawlsQueue } from "./crawls.queue";

export class CrawlsService {
  constructor(private readonly headless: boolean) {}

  async crawl(url: string) {
    const crawler = new Crawler(url, this.headless);

    await crawler.launch();
    await crawler.run();
    await crawler.close();
  }
}
