import { Controller, Post, Get, Del, Query, Body, Inject } from '@midwayjs/core';
import { SportService } from '../service/sport.service';

@Controller('/sport')
export class SportController {
  @Inject()
  sportService: SportService;

  @Post('/create')
  async createSport(@Body() body) {
    const { name, venueId } = body;
    if (!name || !venueId) {
      return { success: false, message: '请输入运动名称和场馆ID' };
    }
    return await this.sportService.createSport(name, venueId);
  }

  @Get('/list')
  async getSportsByVenue(@Query('venueId') venueId: number) {
    if (!venueId) {
      return { success: false, message: '请输入场馆ID' };
    }
    return await this.sportService.getSportsByVenue(venueId);
  }

  @Del('/delete')
  async deleteSport(@Query('id') id: number) {
    if (!id) {
      return { success: false, message: '请输入要删除的运动ID' };
    }
    return await this.sportService.deleteSport(id);
  }
}
