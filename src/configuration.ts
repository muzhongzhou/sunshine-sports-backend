import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as typeorm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import * as cors from '@koa/cors';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';
import * as staticFile from '@midwayjs/static-file';
import DefaultConfig from './config/config.default';

@Configuration({
  imports: [
    koa,
    jwt,
    validate,
    typeorm,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [{
    default: DefaultConfig,
  }],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.use(cors());
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
