import { Hono } from "hono";
import { logger } from "hono/logger";

import { CrawlsModule } from "./http/crawls";

const app = new Hono();
app.use(logger());

const crawlsModule = new CrawlsModule();

app.route(`/api/${crawlsModule.path}`, crawlsModule.router);

export default app;
