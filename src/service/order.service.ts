import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { User } from '../entity/user.entity';
import { Reservation } from '../entity/reservation.entity';
import { OrderReservation } from '../entity/order-reservation.entity'; // 新增

@Provide()
export class OrderService {
  @InjectEntityModel(Order)
  orderModel: Repository<Order>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Reservation)
  reservationModel: Repository<Reservation>;

  @InjectEntityModel(OrderReservation) // 新增
  orderReservationModel: Repository<OrderReservation>;

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

    // 创建订单
    const order = new Order();
    order.user = user;
    order.status = '已提交';
    const savedOrder = await this.orderModel.save(order);

    // 创建订单-预约关联
    const orderReservations = reservations.map(reservation => {
      const or = new OrderReservation();
      or.order = savedOrder;
      or.reservation = reservation;
      return or;
    });
    await this.orderReservationModel.save(orderReservations);

    // 更新预约状态
    await this.reservationModel.update(
      { rid: In(reservations.map(r => r.rid)) },
      { status: '已上传' }
    );

    return {
      success: true,
      message: '订单创建成功',
      data: await this.orderModel.findOne({
        where: { oid: savedOrder.oid },
        relations: ['orderReservations', 'orderReservations.reservation']
      })
    };
  }

  // 获取所有订单
  async getAllOrders() {
    const orders = await this.orderModel.find({
      relations: [
        'user',
        'orderReservations',
        'orderReservations.reservation',
        'orderReservations.reservation.venue',
        'orderReservations.reservation.sport'
      ]
    });

    // 重构数据结构以便前端使用
    return orders.map(order => ({
      ...order,
      reservations: order.orderReservations.map(or => or.reservation)
    }));
  }

  // 审批订单
  async approveOrder(oid: number, approve: boolean) {
    const order = await this.orderModel.findOne({
      where: { oid },
      relations: ['orderReservations', 'orderReservations.reservation']
    });

    if (!order) {
      return { success: false, message: '订单不存在' };
    }

    order.status = approve ? '已审批-同意' : '已审批-拒绝';
    await this.orderModel.save(order);

    // 更新关联预约的状态
    if (approve) {
      const reservationIds = order.orderReservations.map(or => or.reservation.rid);
      await this.reservationModel.update(
        { rid: In(reservationIds) },
        { status: '已批准' }
      );
    }

    return {
      success: true,
      message: '审批完成',
      data: order
    };
  }
}
