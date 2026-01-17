import { Command } from "commander";

import { isValidUrl } from "./utils";
import { Crawler } from "./crawler";

const program = new Command();

program
  .command("crawl")
  .description("Crawl a website and discover all pages")
  .argument("<url>", "Root URL to crawl")
  .action(async (url: string) => {
    if (!isValidUrl(url)) {
      throw new Error("Invalid URL. Please provide a valid absolute URL.");
    }
    const crawler = new Crawler(url, false);

    await crawler.launch();
    await crawler.run();
    await crawler.close();
  });

program.parse();
