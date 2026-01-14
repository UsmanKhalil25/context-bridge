import { Hono } from "hono";

import { CrawlsModule } from "./crawls";
import { configMiddleware } from "./middlewares/config.middleware";
import { configs, type AppConfig } from "./configs";

type Variables = {
  config: AppConfig;
};

const app = new Hono<{ Variables: Variables }>();

app.use("*", configMiddleware(configs));

const crawlsModule = new CrawlsModule();

app.route(`/api/${crawlsModule.path}`, crawlsModule.router);

export default app;
