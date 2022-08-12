import { ICommand } from '@nestjs/cqrs';
import { DeleteUserCommitCommandDataType } from './delete-user-commit.command';
import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { TransactionIdType } from '../../domain/type/mq-type/message-queue.common';

export interface DeleteUserRollbackCommandDataType
  extends Pick<UserEntityType, 'userUUID'>,
    TransactionIdType {}

export class DeleteUserRollbackCommand implements ICommand {
  constructor(
    readonly deleteUserRollbackCommandDTO: DeleteUserRollbackCommandDataType,
  ) {}
}
