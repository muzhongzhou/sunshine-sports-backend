import { Controller, Post, Get, Body, Query, Inject } from '@midwayjs/core';
import { CommentService } from '../service/comment.service';
import { Context } from '@midwayjs/koa';

@Controller('/comment')
export class CommentController {
  @Inject()
  commentService: CommentService;

  @Inject()
  ctx: Context;

  // 添加评论接口
  @Post('/create')
  async addComment(@Body() body) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    const { venueId,  content } = body;
    if (!venueId ||  !content) {
      return { success: false, message: '缺少必要参数' };
    }
    const result = await this.commentService.addComment(venueId, user.uid, content);
    return { success: true, message: '评论添加成功', data: result };
  }

  // 获取某场馆评论接口
  @Get('/list')
  async getComments(@Query('venueId') venueId: number) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    if (!venueId) {
      return { success: false, message: '请提供场馆ID' };
    }
    const comments = await this.commentService.getCommentsByVenue(venueId);
    return { success: true, data: comments };
  }
}
