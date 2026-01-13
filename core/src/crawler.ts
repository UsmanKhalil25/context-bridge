import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { isSameOrigin, isValidUrl } from "./utils";

export class Crawler {
  private readonly queue: string[] = [];
  private readonly visited = new Set<string>();

  private browser!: Browser;

  constructor(
    private readonly baseUrl: string,
    private readonly headless = true,
  ) {
    this.queue.push(baseUrl);
  }

  async launch() {
    this.browser = await chromium.launch({
      headless: this.headless,
      args: ["--disable-web-security", "--no-sandbox"],
    });
  }

  private async getLinks(page: Page): Promise<string[]> {
    return page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"))
        .map((a) => (a as HTMLAnchorElement).href)
        .filter(Boolean),
    );
  }

  async run() {
    if (!this.browser)
      throw new Error("Browser not initialized. Call launch() first.");

    while (this.queue.length > 0) {
      const url = this.queue.shift()!;
      if (this.visited.has(url)) continue;

      const page = await this.browser.newPage();
      try {
        await page.goto(url, { waitUntil: "networkidle" });
        const links = await this.getLinks(page);

        for (const link of links) {
          if (
            !this.visited.has(link) &&
            isValidUrl(link) &&
            isSameOrigin(link, this.baseUrl)
          )
            this.queue.push(link);
        }

        this.visited.add(url);
        console.log(`Visited: ${url}, Found links: ${links.length}`);
      } catch (err) {
        console.error(`Failed to crawl ${url}:`, err);
      } finally {
        await page.close();
      }
    }
  }

  async close() {
    await this.browser?.close();
  }
}
