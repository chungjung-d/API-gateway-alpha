import { Injectable } from '@nestjs/common';
import { JWTTokenDTO } from '../../../domain/DTO/auth.dto';

@Injectable()
export abstract class InterfaceUseCase<R,L>  {
  abstract register(registerDTO: R) : Promise<void>
  abstract login(loginDTO : L) : Promise<JWTTokenDTO>
}
