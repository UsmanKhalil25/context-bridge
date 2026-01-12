export class Crawler {
  constructor(private readonly baseUrl: string) {}

  run() {
    console.log({ baseUrl: this.baseUrl });
  }
}
