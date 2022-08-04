import { UserInfoEntityType } from '../type/entity-type/user.entity-type';
import { AggregateRoot, EventPublisher } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';

export type UserInfoRequireProperties = Pick<UserInfoEntityType, 'userUUID'>;
export type UserInfoOptionalProperties = Partial<
  Omit<UserInfoEntityType, 'userUUID'>
>;

export type UserInfoProperties = Required<UserInfoRequireProperties> &
  Required<UserInfoOptionalProperties>;

export interface UserInfoClassInterface {
  properties: () => UserInfoProperties;
}

export class UserInfoClass
  extends AggregateRoot
  implements UserInfoClassInterface
{
  readonly userUUID: string;

  constructor(
    properties: Required<UserInfoRequireProperties> &
      UserInfoOptionalProperties,
  ) {
    super();
    Object.assign(this, properties);
  }

  properties(): UserInfoProperties {
    return {
      userUUID: this.userUUID,
    };
  }
}

export class UserInfoFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(userUUID: string): UserInfoClass {
    return this.eventPublisher.mergeObjectContext(
      new UserInfoClass({ userUUID: userUUID }),
    );
  }

  reconstitute(userProprerties: UserInfoProperties): UserInfoClass {
    return this.eventPublisher.mergeObjectContext(
      new UserInfoClass(userProprerties),
    );
  }
}
