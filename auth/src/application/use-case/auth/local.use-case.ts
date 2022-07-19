import { Injectable } from '@nestjs/common';
import { JWTTokenDTO, LocalLoginDTO, LocalRegisterDTO } from '../../../domain/DTO/auth.dto';
import { InterfaceUseCase } from './interface.use-case';

@Injectable()
export class LocalUseCase implements InterfaceUseCase<LocalRegisterDTO, LocalLoginDTO>{

  async register(registerDTO: LocalRegisterDTO): Promise<void> {
    // Transaction with Register
    return Promise.resolve(undefined);
  }

  async login(loginDTO: LocalLoginDTO): Promise<JWTTokenDTO> {
    // Transaction with Login
    return Promise.resolve(undefined);
  }

  private async emailVerify() : Promise<boolean> {
    return true
  }
}
