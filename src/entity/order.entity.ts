import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

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

  @Column()
  reservationIds: string; // 关联报名rid，以","分隔存储
}
