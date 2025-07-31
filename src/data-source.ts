import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { Venue } from "./entity/venue.entity";
import { Comment } from "./entity/comment.entity";
import { Reservation } from './entity/reservation.entity';
import { Order } from './entity/order.entity';
import { Sport } from "./entity/sport.entity";
import { OrderReservation } from "./entity/order-reservation.entity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'sunshine_db',
  synchronize: false,
  logging: true,
  entities: [User, Venue, Comment, Reservation, Order, Sport, OrderReservation],
  migrations: ['src/migration/**/*.ts'],
});
