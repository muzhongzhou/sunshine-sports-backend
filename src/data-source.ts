import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { Venue } from "./entity/venue.entity";
import { Comment } from "./entity/comment.entity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'sunshine_db',
  synchronize: true,
  logging: true,
  entities: [User, Venue, Comment],
  migrations: ['src/migration/**/*.ts'],
});
