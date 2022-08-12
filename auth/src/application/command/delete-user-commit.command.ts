import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { ICommand } from '@nestjs/cqrs';
import { TransactionIdType } from '../../domain/type/mq-type/message-queue.common';

export interface DeleteUserCommitCommandDataType
  extends Pick<UserEntityType, 'userUUID'>,
    TransactionIdType {}

export class DeleteUserCommitCommand implements ICommand {
  constructor(readonly deleteUserCommandDTO: DeleteUserCommitCommandDataType) {}
}
