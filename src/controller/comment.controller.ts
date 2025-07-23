import { Controller, Post, Get, Body, Query, Inject } from '@midwayjs/core';
import { CommentService } from '../service/comment.service';

@Controller('/comment')
export class CommentController {
  @Inject()
  commentService: CommentService;

  // 添加评论接口
  @Post('/create')
  async addComment(@Body() body) {
    const { venueId, userId, content } = body;
    if (!venueId || !userId || !content) {
      return { success: false, message: '缺少必要参数' };
    }
    const result = await this.commentService.addComment(venueId, userId, content);
    return { success: true, message: '评论添加成功', data: result };
  }

  // 获取某场馆评论接口
  @Get('/list')
  async getComments(@Query('venueId') venueId: number) {
    if (!venueId) {
      return { success: false, message: '请提供场馆ID' };
    }
    const comments = await this.commentService.getCommentsByVenue(venueId);
    return { success: true, data: comments };
  }
}
