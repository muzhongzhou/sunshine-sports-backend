import { Controller, Get, Query, Inject } from '@midwayjs/core';
import { ActivityService } from '../service/activity.service';
import { Context } from '@midwayjs/koa';

@Controller('/activity')
export class ActivityController {
  @Inject()
  activityService: ActivityService;

  @Inject()
  ctx: Context;

  // 搜索场馆
  @Get('/search')
  async search(@Query('keyword') keyword: string) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    return await this.activityService.search(keyword);
  }

  // 获取场馆详情
  @Get('/detail')
  async detail(@Query('venueId') venueId: number) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    if (!venueId) {
      return { success: false, message: '请提供场馆ID' };
    }
    return await this.activityService.getVenueDetail(venueId);
  }
}
