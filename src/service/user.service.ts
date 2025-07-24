import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  jwtService: JwtService;

  // 注册
  async register(name: string, phone: string, password: string, role: '学生' | '老师') {
    const exist = await this.userModel.findOneBy({ phone });
    if (exist) {
      return { success: false, message: '手机号已注册' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.phone = phone;
    user.password = hashedPassword;
    user.role = role;

    await this.userModel.save(user);

    delete user.password;

    return { success: true, message: '注册成功', data: user };
  }

  // 登录
  async login(phone: string, password: string) {
    const user = await this.userModel.findOneBy({ phone });
    if (!user) {
      return { success: false, message: '手机号或密码错误' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: '手机号或密码错误' };
    }

    // 生成 token
    const token = await this.jwtService.sign({
      uid: user.uid,
      phone: user.phone,
      role: user.role,
    });

    delete user.password;

    return {
      success: true,
      message: '登录成功',
      data: {user, token} // 返回 token
    };
  }

  // 根据 uid 获取用户信息
  async getUser(uid: number) {
    const user = await this.userModel.findOneBy({ uid });
    if (user) {
      delete user.password;
      return { success: true, data: user };
    } else {
      return { success: false, message: '用户不存在' };
    }
  }
}
