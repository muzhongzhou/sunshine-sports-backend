import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user.entity';
import { Venue } from "../entity/venue.entity";
import { Comment } from "../entity/comment.entity";
import { Reservation } from "../entity/reservation.entity";
import { Order } from "../entity/order.entity";
import { Sport } from "../entity/sport.entity";
import { OrderReservation } from "../entity/order-reservation.entity";
import {join} from "path";

export default {
  // use for a cookie sign key, should change to your own and keep security
  keys: '1752828959331_4230',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
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
        entities: [User, Venue, Comment, Reservation, Order, Sport, OrderReservation],
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || '3a5b640bd867481f39d81c497e4529116698e0bdce5dbc2c6048753e182a4af814033cffe9b95ccd69bf63cd02f819df393f5bc8736995456ac41d904d85978f',
    expiresIn: '2d', // token 有效期
  },
  // 静态文件配置
  staticFile: {
    dirs: {
      default: {
        // 这里指定了静态文件的根目录
        // join(__dirname, '../public') 表示在项目根目录下的 public 文件夹
        root: join(__dirname, '../public'),
        // 配置兜底路由，指向 index.html
        // 这比在 onReady 中手动添加中间件更优雅
        fallback: 'index.html',
      },
    },
  },
} as MidwayConfig;
