import { Controller, Get, Query, Inject } from '@midwayjs/core';
import { ActivityService } from '../service/activity.service';

@Controller('/activity')
export class ActivityController {
  @Inject()
  activityService: ActivityService;

  // 搜索场馆
  @Get('/search')
  async search(@Query('keyword') keyword: string) {
    return await this.activityService.search(keyword);
  }

  // 获取场馆详情
  @Get('/detail')
  async detail(@Query('venueId') venueId: number) {
    if (!venueId) {
      return { success: false, message: '请提供场馆ID' };
    }
    return await this.activityService.getVenueDetail(venueId);
  }
}
