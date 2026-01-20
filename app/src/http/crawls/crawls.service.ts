import { Crawler } from "core";

import { CrawlsQueue } from "./crawls.queue";

export class CrawlsService {
  async crawl(url: string) {
    const crawler = new Crawler(url, false);

    await crawler.launch();
    await crawler.run();
    await crawler.close();
  }
}
