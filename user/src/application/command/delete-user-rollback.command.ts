import { ICommand } from '@nestjs/cqrs';
import { UserInfoEntityType } from '../../domin/type/entity-type/user-info.entity-type';
import { TransactionIdType } from '../../domin/type/mq-type/message-queue.common';

export interface DeleteUserRollbackCommandDataType
  extends Pick<UserInfoEntityType, 'userUUID'>,
    TransactionIdType {}

export class DeleteUserRollbackCommand implements ICommand {
  constructor(
    readonly deleteUserRollbackCommandDataType: DeleteUserRollbackCommandDataType,
  ) {}
}
