import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sport } from './sport.entity';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  vid: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sport, sport => sport.venue)
  sports: Sport[];

  @Column()
  address: string;

  @Column()
  phone: string;
}
