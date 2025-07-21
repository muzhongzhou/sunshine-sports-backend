import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class PersonalService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  // 更新用户信息
  async updateInfo(uid: number, updates: Partial<User>) {
    const user = await this.userModel.findOneBy({ uid });
    if (!user) {
      return { success: false, message: '用户不存在' };
    }
    Object.assign(user, updates);
    await this.userModel.save(user);
    return { success: true, message: '更新成功', data: user };
  }

  // 退出登录（这里为示例，真正退出一般通过前端清除token或session）
  async logout(uid: number) {
    // 如果使用 token，可在数据库维护 token 失效逻辑；这里简单返回
    return { success: true, message: '退出登录成功' };
  }
}
