import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Venue } from '../entity/venue.entity';
import { Sport } from '../entity/sport.entity';
import { Comment } from '../entity/comment.entity';

@Provide()
export class ActivityService {
  @InjectEntityModel(Venue)
  venueModel: Repository<Venue>;

  @InjectEntityModel(Sport)
  sportModel: Repository<Sport>;

  @InjectEntityModel(Comment)
  commentModel: Repository<Comment>;

  // 搜索场馆
  async search(keyword: string) {
    // 处理空搜索
    if (!keyword.trim()) {
      return {
        success: true,
        data: await this.venueModel.find({ relations: ['sports'] })
      };
    }

    const venues = await this.venueModel.find({
      relations: ['sports'],
      where: [
        { name: Like(`%${keyword}%`) },
        { sports: { name: Like(`%${keyword}%`) } }
      ]
    });
    return { success: true, data: venues };
  }

  // 获取场馆详情
  async getVenueDetail(venueId: number) {
    const venue = await this.venueModel.findOne({
      where: { vid: venueId },
      relations: ['sports']
    });
    if (!venue) {
      return { success: false, message: '场馆不存在' };
    }

    const comments = await this.commentModel.findBy({ venueId });
    return { success: true, data: { venue, comments } };
  }
}
