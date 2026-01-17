import { Hono } from "hono";

import { CrawlsModule } from "./crawls";

const app = new Hono();

const crawlsModule = new CrawlsModule();

app.route(`/api/${crawlsModule.path}`, crawlsModule.router);

export default app;
