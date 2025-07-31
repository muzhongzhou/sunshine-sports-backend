import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { User } from './user.entity';
import { Venue } from './venue.entity';
import { Sport } from "./sport.entity";
import { OrderReservation } from './order-reservation.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  rid: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uid' })
  user: User;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @ManyToOne(() => Sport)
  @JoinColumn({ name: 'sportId' })
  sport: Sport;

  @Column()
  timeSlot: string;

  @Column({ default: '待上传' })
  status: string;

  @OneToMany(() => OrderReservation, or => or.reservation)
  orderReservations: OrderReservation[];
}
