import {IMiddleware, Inject, Middleware} from '@midwayjs/core';
import {JwtService} from '@midwayjs/jwt';
import {Context, NextFunction} from '@midwayjs/koa';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  public static ignorePaths = [
    '/user/register',
    '/user/login'
  ];

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 检查是否在白名单中
      if (JwtMiddleware.ignorePaths.includes(ctx.path)) {
        await next();
        return;
      }

      const authHeader = ctx.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        ctx.status = 401;
        ctx.body = { success: false, message: '缺少认证token' };
        return;
      }

      const token = authHeader.split(' ')[1];
      try {
        // 修改为类型断言方式
        ctx.user = await this.jwtService.verify(token) ;

        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = { success: false, message: '无效或过期的token' };
      }
    };
  }

  static getName(): string {
    return 'jwt';
  }
}
