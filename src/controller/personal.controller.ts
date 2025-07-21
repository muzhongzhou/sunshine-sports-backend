import { Controller, Put, Post, Body, Query, Inject } from '@midwayjs/core';
import { PersonalService } from '../service/personal.service';

@Controller('/personal')
export class PersonalController {
  @Inject()
  personalService: PersonalService;

  // 更新个人信息
  @Put('/update')
  async updateInfo(@Query('uid') uid: number, @Body() body) {
    if (!uid) {
      return { success: false, message: '请提供用户ID' };
    }
    return await this.personalService.updateInfo(uid, body);
  }

  // 退出登录
  @Post('/logout')
  async logout(@Query('uid') uid: number) {
    if (!uid) {
      return { success: false, message: '请提供用户ID' };
    }
    return await this.personalService.logout(uid);
  }
}
