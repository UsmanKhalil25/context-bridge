import { Browser } from "./browser";
import { Scraper } from "./scraper";
import { State } from "./state";

export class Crawler {
  private browser: Browser;
  private state: State;

  constructor(url: string, verbose: boolean) {
    this.browser = new Browser(verbose);
    this.state = new State(url);
  }

  async launch() {
    await this.browser.launch();
  }

  async run() {
    let url = this.state.getNextUrl();
    while (url !== null) {
      try {
        await this.browser.navigate(url);
        const page = this.browser.getPage();
        const links = await Scraper.getLinks(page);

        this.state.markUrlCrawled(url, links);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.state.markUrlFailed(url, errorMessage);
      }

      url = this.state.getNextUrl();
    }
  }

  async close() {
    await this.browser.close();
  }
}
