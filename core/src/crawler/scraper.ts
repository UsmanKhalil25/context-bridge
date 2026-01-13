import type { Page } from "playwright";

export class Scraper {
  static getLinks(page: Page) {
    return page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"))
        .map((a) => (a as HTMLAnchorElement).href)
        .filter(Boolean),
    );
  }
}
