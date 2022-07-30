import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthBusiness } from '../business/auth.business';
import { UserInfoHttpDTO } from '../../interface/DTO/auth.http.dto';

@Injectable()
export class VerifyAccessJwtInterceptor implements NestInterceptor {
  constructor(private readonly authBusiness: AuthBusiness) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = await context.switchToHttp().getRequest();
    const accessToken = req.headers.authorization;
    let user = null;

    try {
      if (accessToken.substring(0, 6) === 'Bearer') {
        const userData: UserInfoHttpDTO =
          await this.authBusiness.verifyAccessJWTToken({
            accessToken: accessToken.substring(7),
          });
        user = userData;
      }
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (user === null) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    req.user = user;
    return next.handle();
  }
}
