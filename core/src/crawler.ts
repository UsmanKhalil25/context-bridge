export class Crawler {
  private readonly queue: string[] = [];
  private readonly visited = new Set<string>();

  constructor(private readonly baseUrl: string) {
    this.queue.push(baseUrl);
  }

  async run() {
    while (this.queue.length) {
      const currentUrl = this.queue.shift()!;
      if (this.visited.has(currentUrl)) continue;

      this.visited.add(currentUrl);

      const response = await fetch(currentUrl);
      const text = await response.text();
      console.log({ text });
      // TODO: extract links and add to queue
      // make sure that the url is the same origin
    }
  }
}
