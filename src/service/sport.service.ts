import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from '../entity/sport.entity';

@Provide()
export class SportService {
  @InjectEntityModel(Sport)
  sportModel: Repository<Sport>;

  async createSport(name: string, venueId: number) {
    const sport = new Sport();
    sport.name = name;
    sport.venueId = venueId;
    await this.sportModel.save(sport);
    return { success: true, data: sport };
  }

  async getSportsByVenue(venueId: number) {
    const sports = await this.sportModel.find({ where: { venueId } });
    return { success: true, data: sports };
  }

  async deleteSport(sid: number) {
    await this.sportModel.delete(sid);
    return { success: true, message: '删除成功' };
  }
}
