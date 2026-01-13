import type {
  Browser as PlaywrightBrowser,
  BrowserContext,
  Page,
} from "playwright";
import { chromium } from "playwright";

export class Browser {
  private browser!: PlaywrightBrowser;
  private context!: BrowserContext;
  private page!: Page;

  getPage(): Page {
    if (!this.page) {
      throw new Error("Browser not launched. Call launch() first.");
    }
    return this.page;
  }

  async launch() {
    this.browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-web-security",
        "--no-sandbox",
        "--disable-site-isolation-trials",
      ],
    });

    this.context = await this.browser.newContext({ ignoreHTTPSErrors: true });
    this.page = await this.context.newPage();
  }

  async navigate(url: string) {
    const page = this.getPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await this.wait();
  }

  async wait(timeoutMs = 500) {
    const page = this.getPage();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(timeoutMs);
  }

  async close() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}
