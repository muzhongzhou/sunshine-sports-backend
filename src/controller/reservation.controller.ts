import { Controller, Post, Get, Body, Query, Inject, Del } from '@midwayjs/core';
import { ReservationService } from '../service/reservation.service';
import { Context } from "@midwayjs/koa";

@Controller('/reservation')
export class ReservationController {
  @Inject()
  reservationService: ReservationService;

  @Inject()
  ctx: Context;

  // 添加报名
  @Post('/create')
  async reserve(@Body() body) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    const { venueId, sportId, timeSlot } = body;
    if ( !venueId || !sportId || !timeSlot) {
      return { success: false, message: '请填写所有信息' };
    }
    return await this.reservationService.addReservation(user.uid, venueId, sportId, timeSlot);
  }

  // 获取用户所有报名
  @Get('/list')
  async getReservations() {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    return await this.reservationService.getReservationsByUser(user.uid);
  }

  // 删除报名
  @Del('/delete')
  async deleteReservation(@Query('rid') rid: number) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    if (!rid) {
      return { success: false, message: '请提供报名ID' };
    }
    return await this.reservationService.deleteReservation(rid);
  }
}
