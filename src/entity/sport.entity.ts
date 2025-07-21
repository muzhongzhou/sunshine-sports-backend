import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  sid: number;

  @Column()
  name: string;

  @ManyToOne(() => Venue, venue => venue.sports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @Column()
  venueId: number;
}
