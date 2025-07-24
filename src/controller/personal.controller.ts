import { Controller, Put, Post, Body, Inject } from '@midwayjs/core';
import { PersonalService } from '../service/personal.service';
import { Context } from '@midwayjs/koa';

@Controller('/personal')
export class PersonalController {
  @Inject()
  personalService: PersonalService;

  @Inject()
  ctx: Context;

  // 更新个人信息
  @Put('/update')
  async updateInfo(@Body() body) {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }

    return await this.personalService.updateInfo(user.uid, body);
  }

  // 退出登录
  @Post('/logout')
  async logout() {
    const user = this.ctx.user;
    if (!user) {
      return { success: false, message: '未登录' };
    }
    return await this.personalService.logout(user.uid);
  }
}
