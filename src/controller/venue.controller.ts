import { Controller, Post, Get, Put, Del, Body, Param, Inject } from '@midwayjs/core';
import { VenueService } from '../service/venue.service';

@Controller('/venue')
export class VenueController {
  @Inject()
  venueService: VenueService;

  // 创建场馆
  @Post('/create')
  async createVenue(@Body() body) {
    return await this.venueService.createVenue(body);
  }

  // 获取所有场馆
  @Get('/list')
  async getAllVenues() {
    return await this.venueService.getAllVenues();
  }

  // 获取单个场馆
  @Get('/:vid')
  async getVenueById(@Param('vid') vid: number) {
    return await this.venueService.getVenueById(vid);
  }

  // 更新场馆
  @Put('/update/:vid')
  async updateVenue(@Param('vid') vid: number, @Body() body) {
    return await this.venueService.updateVenue(vid, body);
  }

  // 删除场馆
  @Del('/delete/:vid')
  async deleteVenue(@Param('vid') vid: number) {
    return await this.venueService.deleteVenue(vid);
  }
}
