import { ICommand } from '@nestjs/cqrs';
import { UserInfoEntityType } from '../../domin/type/entity-type/user-info.entity-type';
import { TransactionIdType } from '../../domin/type/mq-type/message-queue.common';

export interface DeleteUserCommitCommandDataType
  extends Pick<UserInfoEntityType, 'userUUID'>,
    TransactionIdType {}

export class DeleteUserCommitCommand implements ICommand {
  constructor(
    readonly deleteUserCommitCommandDTO: DeleteUserCommitCommandDataType,
  ) {}
}
