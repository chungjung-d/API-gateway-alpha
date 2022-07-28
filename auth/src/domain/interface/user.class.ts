import { UserEntityType } from '../type/entity-type/user.entity-type';
import { AggregateRoot, EventPublisher } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserInformationDataType } from '../type/message-type/auth.query.message-type';

export type UserRequireProperties = Pick<
  UserEntityType,
  'userEmailId' | 'userPassword'
>;
export type UserOptionalProperties = Partial<
  Omit<UserEntityType, 'userEmailId' | 'userPassword'>
>;

export type UserProperties = Required<UserRequireProperties> &
  Required<UserOptionalProperties>;

export interface GenerateJWTTokenType {
  readonly secret: string;
  readonly expireTime: string;
}

export interface UserClassInterface {
  properties: () => UserProperties;

  comparePassword: (password: string) => Promise<boolean>;

  createAccessJWTToken: (
    generateJWTTokenDTO: GenerateJWTTokenType,
  ) => Promise<string>;

  createRefreshJWTToken: (
    generateJWTTokenDTO: GenerateJWTTokenType,
  ) => Promise<string>;

  setRefreshJWTToken: (refreshJWTToken: string) => void;

  getUserInfo: () => UserInformationDataType;
}

export class UserClass extends AggregateRoot implements UserClassInterface {
  readonly accessLevel: number;
  readonly lastActivate: Date | null;
  readonly userEmailId: string;
  userJWTRefreshToken: string | null;
  readonly userPassword: string;
  readonly userUUID: string | null = null;

  constructor(
    properties: Required<UserRequireProperties> & UserOptionalProperties,
  ) {
    super();
    Object.assign(this, properties);
  }

  properties(): UserProperties {
    return {
      accessLevel: this.accessLevel,
      lastActivate: this.lastActivate,
      userEmailId: this.userEmailId,
      userPassword: this.userPassword,
      userUUID: this.userUUID,
      userJWTRefreshToken: this.userJWTRefreshToken,
    };
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.userPassword);
  }

  async createAccessJWTToken(
    generateJWTTokenDTO: GenerateJWTTokenType,
  ): Promise<string> {
    const { secret, expireTime } = generateJWTTokenDTO;
    return jwt.sign({ sub: this.userEmailId }, secret, {
      algorithm: 'HS256',
      expiresIn: expireTime,
    });
  }

  async createRefreshJWTToken(
    generateJWTTokenDTO: GenerateJWTTokenType,
  ): Promise<string> {
    const { secret, expireTime } = generateJWTTokenDTO;
    return jwt.sign({ sub: this.userEmailId }, secret, {
      algorithm: 'HS256',
      expiresIn: expireTime,
    });
  }

  setRefreshJWTToken(refreshJWTToken: string): void {
    this.userJWTRefreshToken = refreshJWTToken;
  }

  getUserInfo(): UserInformationDataType {
    return {
      accessLevel: this.accessLevel,
      userEmailId: this.userEmailId,
      userUUID: this.userUUID,
    };
  }
}

export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(userEmailId: string, userPassword: string): UserClass {
    return this.eventPublisher.mergeObjectContext(
      new UserClass({ userEmailId: userEmailId, userPassword: userPassword }),
    );
  }

  reconstitute(userProprerties: UserProperties): UserClass {
    return this.eventPublisher.mergeObjectContext(
      new UserClass(userProprerties),
    );
  }
}
