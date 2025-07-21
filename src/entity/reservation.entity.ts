import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Venue } from './venue.entity';

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

  @Column()
  sport: string;

  @Column()
  timeSlot: string;

  @Column({ default: '待上传' })
  status: string;
}
