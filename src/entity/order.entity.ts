import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn} from 'typeorm';
import { User } from './user.entity';
import { OrderReservation } from './order-reservation.entity'; // 新增关联实体

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  oid: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uid' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: '已提交' })
  status: string; // 已提交 / 已审批-同意 / 已审批-拒绝

  // 使用关联表替代原有的 reservationIds 字符串
  @OneToMany(() => OrderReservation, or => or.order)
  orderReservations: OrderReservation[];
}
