import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { Venue } from "../entity/venue.entity";
import { Comment } from "../entity/comment.entity";
import { Reservation } from "../entity/reservation.entity";

export default {
  // use for a cookie sign key, should change to your own and keep security
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
        entities: [User, Venue, Comment, Reservation],
      },
    },
  },
} as MidwayConfig;
