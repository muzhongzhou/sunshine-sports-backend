import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  venueId: number; // 对应的场馆 ID

  @Column()
  userId: number; // 评论用户的 ID

  @Column('text')
  content: string; // 评论内容

  @CreateDateColumn()
  createdAt: Date; // 评论时间
}
