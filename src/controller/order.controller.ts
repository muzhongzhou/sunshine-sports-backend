import { Controller, Post, Get, Body, Inject } from '@midwayjs/core';
import { OrderService } from '../service/order.service';
import { Context } from '@midwayjs/koa';

@Controller('/order')
export class OrderController {
  @Inject()
  orderService: OrderService;

  @Inject()
  ctx: Context;

  // 学生创建订单
  @Post('/create')
  async createOrder(@Body() body) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    const { uid } = body;
    if (!uid) {
      return { success: false, message: '请提供用户ID' };
    }
    return await this.orderService.createOrder(uid);
  }

  // 老师查看所有订单
  @Get('/list')
  async getAllOrders() {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    return await this.orderService.getAllOrders();
  }

  // 老师审批订单
  @Post('/approve')
  async approveOrder(@Body() body) {
    const user = this.ctx.user;
    if (user?.role !== '老师') {
      return { success: false, message: '仅老师可审批订单' };
    }

    const { oid, approve } = body;
    if (!oid || approve === undefined) {
      return { success: false, message: '请提供订单ID和审批结果' };
    }
    return await this.orderService.approveOrder(oid, approve);
  }
}
