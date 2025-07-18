import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1752828959331_4230',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'sunshine_db',
        synchronize: true, // 开发时为 true，生产时改为 false
        logging: true,
        entities: ['src/entity/*.ts'],
      },
    },
  },
} as MidwayConfig;
