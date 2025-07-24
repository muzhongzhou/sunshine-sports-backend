import { Controller, Post, Get, Del, Query, Body, Inject } from '@midwayjs/core';
import { SportService } from '../service/sport.service';
import { Context } from "@midwayjs/koa";

@Controller('/sport')
export class SportController {
  @Inject()
  sportService: SportService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createSport(@Body() body) {
    const user = this.ctx.user;
    if (user?.role !== '老师') {
      return { success: false, message: '仅老师可创建运动' };
    }

    const { name, venueId } = body;
    if (!name || !venueId) {
      return { success: false, message: '请输入运动名称和场馆ID' };
    }
    return await this.sportService.createSport(name, venueId);
  }

  @Get('/list')
  async getSportsByVenue(@Query('venueId') venueId: number) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    if (!venueId) {
      return { success: false, message: '请输入场馆ID' };
    }
    return await this.sportService.getSportsByVenue(venueId);
  }

  @Del('/delete')
  async deleteSport(@Query('sid') sid: number) {
    const user = this.ctx.user;
    if (user?.role !== '老师') {
      return { success: false, message: '仅老师可删除运动' };
    }

    if (!sid) {
      return { success: false, message: '请输入要删除的运动ID' };
    }
    return await this.sportService.deleteSport(sid);
  }
}
