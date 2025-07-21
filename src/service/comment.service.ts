import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@Provide()
export class CommentService {
  @InjectEntityModel(Comment)
  commentModel: Repository<Comment>;

  // 添加评论
  async addComment(venueId: number, userId: number, content: string) {
    const comment = new Comment();
    comment.venueId = venueId;
    comment.userId = userId;
    comment.content = content;
    return await this.commentModel.save(comment);
  }

  // 获取某场馆的所有评论
  async getCommentsByVenue(venueId: number) {
    return await this.commentModel.find({
      where: { venueId },
      order: { createdAt: 'DESC' },
    });
  }
}
