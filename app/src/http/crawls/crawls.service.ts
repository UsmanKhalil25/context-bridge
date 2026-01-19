import { Crawler } from "core";

import { IBaseService } from "../base";

export class CrawlsService implements IBaseService {
  async crawl(url: string) {
    const crawler = new Crawler(url, false);

    await crawler.launch();
    await crawler.run();
    await crawler.close();
  }
}
