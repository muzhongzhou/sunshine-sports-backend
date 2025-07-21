import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';
import { User } from '../entity/user.entity';
import { Venue } from '../entity/venue.entity';

@Provide()
export class ReservationService {
  @InjectEntityModel(Reservation)
  reservationModel: Repository<Reservation>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Venue)
  venueModel: Repository<Venue>;

  // 添加报名
  async addReservation(uid: number, venueId: number, sport: string, timeSlot: string) {
    const user = await this.userModel.findOneBy({ uid });
    const venue = await this.venueModel.findOneBy({ id: venueId });

    if (!user || !venue) {
      return { success: false, message: '用户或场馆不存在' };
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
      relations: ['venue', 'user'],
    });
    return { success: true, data: reservations };
  }

  // 删除报名
  async deleteReservation(rid: number) {
    const result = await this.reservationModel.delete({ rid });
    if (result.affected > 0) {
      return { success: true, message: '删除成功' };
    } else {
      return { success: false, message: '删除失败，记录不存在' };
    }
  }
}
