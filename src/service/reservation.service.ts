import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';
import { User } from '../entity/user.entity';
import { Venue } from '../entity/venue.entity';
import { Sport } from "../entity/sport.entity";
import { OrderReservation } from "../entity/order-reservation.entity";

@Provide()
export class ReservationService {
  @InjectEntityModel(Reservation)
  reservationModel: Repository<Reservation>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Venue)
  venueModel: Repository<Venue>;

  @InjectEntityModel(Sport)
  sportModel: Repository<Sport>;

  @InjectEntityModel(OrderReservation)
  orderReservationModel: Repository<OrderReservation>;

  // 添加报名
  async addReservation(uid: number, venueId: number, sportId: number, timeSlot: string) {
    const user = await this.userModel.findOneBy({ uid });
    const venue = await this.venueModel.findOneBy({ vid: venueId });
    const sport = await this.sportModel.findOneBy({ sid: sportId });

    if (!user || !venue || !sport) {
      return { success: false, message: '用户、场馆或运动不存在' };
    }

    const reservation = new Reservation();
    reservation.user = user;
    reservation.venue = venue;
    reservation.sport = sport;
    reservation.timeSlot = timeSlot;
    reservation.status = '待上传';

    await this.reservationModel.save(reservation);
    return { success: true, message: '报名成功', data: reservation };
  }

  // 获取某用户所有报名
  async getReservationsByUser(uid: number) {
    const reservations = await this.reservationModel.find({
      where: { user: { uid } },
      relations: ['venue', 'sport'],
    });
    return { success: true, data: reservations };
  }

  // 删除报名
  // 在删除预约时添加关联检查
  async deleteReservation(rid: number) {
    // 检查是否已关联到订单
    const linked = await this.orderReservationModel.findOne({
      where: { reservation: { rid } }
    });

    if (linked) {
      return {
        success: false,
        message: '删除失败，该预约已关联到订单'
      };
    }

    const result = await this.reservationModel.delete({ rid });
    if (result.affected > 0) {
      return { success: true, message: '删除成功' };
    } else {
      return { success: false, message: '删除失败，记录不存在' };
    }
  }
}
