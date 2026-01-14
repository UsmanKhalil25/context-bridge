import type { MiddlewareHandler } from "hono";

import type { AppConfig } from "../configs";

export function configMiddleware(configs: AppConfig): MiddlewareHandler {
  return async (c, next) => {
    c.set("config", configs);
    await next();
  };
}
