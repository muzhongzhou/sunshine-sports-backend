import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from '../entity/venue.entity';

@Provide()
export class VenueService {
  @InjectEntityModel(Venue)
  venueModel: Repository<Venue>;

  // 创建场馆
  async createVenue(data: Partial<Venue>) {
    const venue = this.venueModel.create(data);
    await this.venueModel.save(venue);
    return { success: true, data: venue };
  }

  // 获取所有场馆
  async getAllVenues() {
    const venues = await this.venueModel.find();
    return { success: true, data: venues };
  }

  // 根据 ID 获取场馆
  async getVenueById(id: number) {
    const venue = await this.venueModel.findOneBy({ id });
    if (venue) {
      return { success: true, data: venue };
    } else {
      return { success: false, message: '场馆不存在' };
    }
  }

  // 更新场馆
  async updateVenue(id: number, data: Partial<Venue>) {
    await this.venueModel.update(id, data);
    return { success: true, message: '更新成功' };
  }

  // 删除场馆
  async deleteVenue(id: number) {
    await this.venueModel.delete(id);
    return { success: true, message: '删除成功' };
  }
}
