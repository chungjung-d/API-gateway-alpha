import { UserEntityType } from '../type/entity-type/user.entity-type';
import { AggregateRoot, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { User } from '../../infrastructure/entity/user.entity';


export type UserRequireProperties = Pick<UserEntityType,'userEmailId'|'userPassword'>
export type UserOptionalProperties = Partial<Omit<UserEntityType,'userEmailId'|'userPassword'>>

export type UserProperties = Required<UserRequireProperties> & Required<UserOptionalProperties>

export interface UserClassInterface {
  properties: () => UserProperties;
  comparePassword : (password : string) => Promise<boolean>;
}

export class UserClass extends AggregateRoot implements UserClassInterface{

  readonly accessLevel: number;
  readonly lastActivate: Date | null;
  readonly userEmailId: string;
  readonly userJWTRefreshToken: string | null;
  readonly userPassword: string;
  readonly userUUID: string | null;

  constructor(properties: Required<UserRequireProperties> & UserOptionalProperties) {
    super();
    Object.assign(this,properties)
  }

  async comparePassword(password:string) : Promise<boolean> {

    return true;
  }

  properties(): UserProperties {
    return {
      accessLevel: this.accessLevel,
      lastActivate: this.lastActivate,
      userEmailId: this.userEmailId,
      userPassword: this.userPassword,
      userUUID: this.userUUID,
      userJWTRefreshToken: this.userJWTRefreshToken,
    }
  }
}


export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventEventPublisher : EventPublisher,
  ) {}

  create(userEmailId: string, userPassword: string): UserClass {
    return this.eventEventPublisher.mergeObjectContext(
      new UserClass({ userEmailId: userEmailId, userPassword: userPassword }),
    );
  }

  reconstitute(properties: UserProperties): UserClass {
    return this.eventEventPublisher.mergeObjectContext(
      new UserClass(properties),
    );
  }

}