import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { User } from '../entity/user.entity';
import { Reservation } from '../entity/reservation.entity';

@Provide()
export class OrderService {
  @InjectEntityModel(Order)
  orderModel: Repository<Order>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Reservation)
  reservationModel: Repository<Reservation>;

  // 创建订单
  async createOrder(uid: number) {
    const user = await this.userModel.findOneBy({ uid });
    if (!user) {
      return { success: false, message: '用户不存在' };
    }

    // 查找该用户所有待上传报名
    const reservations = await this.reservationModel.find({
      where: { user: { uid }, status: '待上传' },
      relations: ['user', 'venue'],
    });

    if (reservations.length === 0) {
      return { success: false, message: '无待上传报名' };
    }

    const order = new Order();
    order.user = user;
    order.reservationIds = reservations.map(r => r.rid).join(',');
    order.status = '已提交';

    // 更新报名状态为“已上传”
    for (const r of reservations) {
      r.status = '已上传';
    }

    await this.reservationModel.save(reservations);
    await this.orderModel.save(order);
    return { success: true, message: '订单创建成功', data: order };
  }

  // 获取所有订单（教师审批查看用）
  async getAllOrders() {
    const orders = await this.orderModel.find({ relations: ['user'] });
    return { success: true, data: orders };
  }

  // 审批订单
  async approveOrder(oid: number, approve: boolean) {
    const order = await this.orderModel.findOneBy({ oid });
    if (!order) {
      return { success: false, message: '订单不存在' };
    }

    order.status = approve ? '已审批-同意' : '已审批-拒绝';
    await this.orderModel.save(order);
    return { success: true, message: '审批完成', data: order };
  }
}
