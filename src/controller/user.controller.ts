import { Controller, Post, Get, Body, Query, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  // 注册接口
  @Post('/register')
  async register(@Body() body) {
    const { name, phone, password, role } = body;
    if (!name || !phone || !password || !role) {
      return { success: false, message: '请填写所有注册信息' };
    }
    return await this.userService.register(name, phone, password, role);
  }

  // 登录接口
  @Post('/login')
  async login(@Body() body) {
    const { phone, password } = body;
    if (!phone || !password) {
      return { success: false, message: '请填写手机号和密码' };
    }
    return await this.userService.login(phone, password);
  }

  // 获取用户信息接口
  @Get('/info')
  async getUser(@Query('uid') uid: number) {
    if (!uid) {
      return { success: false, message: '请提供用户ID' };
    }
    return await this.userService.getUser(uid);
  }
}

