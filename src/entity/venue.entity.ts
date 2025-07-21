import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('simple-json')
  sports: string[]; // 例如: ["游泳", "乒乓球", "羽毛球"]

  @Column()
  address: string;

  @Column()
  phone: string;
}
