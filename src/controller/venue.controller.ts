import { Controller, Post, Get, Put, Del, Body, Param, Inject } from '@midwayjs/core';
import { VenueService } from '../service/venue.service';
import { Context } from "@midwayjs/koa";

@Controller('/venue')
export class VenueController {
  @Inject()
  venueService: VenueService;

  @Inject()
  ctx: Context;

  // 创建场馆
  @Post('/create')
  async createVenue(@Body() body) {
    const user = this.ctx.user;
    if (user?.role !== '老师') {
      return { success: false, message: '仅老师可创建场馆' };
    }

    return await this.venueService.createVenue(body);
  }

  // 获取所有场馆
  @Get('/list')
  async getAllVenues() {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }
    return await this.venueService.getAllVenues();
  }

  // 获取单个场馆
  @Get('/:vid')
  async getVenueById(@Param('vid') vid: number) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }
    return await this.venueService.getVenueById(vid);
  }

  // 更新场馆
  @Put('/update/:vid')
  async updateVenue(@Param('vid') vid: number, @Body() body) {
    const user = this.ctx.user;
    if (user?.role !== '老师') {
      return { success: false, message: '仅老师可更新场馆' };
    }
    return await this.venueService.updateVenue(vid, body);
  }

  // 删除场馆
  @Del('/delete/:vid')
  async deleteVenue(@Param('vid') vid: number) {
    const user = this.ctx.user;
    if (user?.role !== '老师') {
      return { success: false, message: '仅老师可删除场馆' };
    }
    return await this.venueService.deleteVenue(vid);
  }
}
