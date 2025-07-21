import { Controller, Post, Get, Body, Query, Inject, Del } from '@midwayjs/core';
import { ReservationService } from '../service/reservation.service';

@Controller('/reservation')
export class ReservationController {
  @Inject()
  reservationService: ReservationService;

  // 添加报名
  @Post('/add')
  async addReservation(@Body() body) {
    const { uid, venueId, sport, timeSlot } = body;
    if (!uid || !venueId || !sport || !timeSlot) {
      return { success: false, message: '请填写所有报名信息' };
    }
    return await this.reservationService.addReservation(uid, venueId, sport, timeSlot);
  }

  // 获取用户所有报名
  @Get('/list')
  async getReservations(@Query('uid') uid: number) {
    if (!uid) {
      return { success: false, message: '请提供用户ID' };
    }
    return await this.reservationService.getReservationsByUser(uid);
  }

  // 删除报名
  @Del('/delete')
  async deleteReservation(@Query('rid') rid: number) {
    if (!rid) {
      return { success: false, message: '请提供报名ID' };
    }
    return await this.reservationService.deleteReservation(rid);
  }
}
