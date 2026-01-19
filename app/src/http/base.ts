import type { Hono } from "hono";

export interface IBaseModule {
  readonly path: string;
  readonly router: Hono;
}

export interface IBaseController {
  readonly app: Hono;
}

export interface IBaseService {}
