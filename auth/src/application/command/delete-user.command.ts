import { UserEntityType } from '../../domain/type/entity-type/user.entity-type';
import { ICommand } from '@nestjs/cqrs';
import {
  MessageQueueState,
  MessageQueueStateDataType,
} from '../../domain/type/mq-type/message-queue.state.type';

export interface DeleteUserCommandDataType
  extends Pick<UserEntityType, 'userUUID'>,
    MessageQueueStateDataType {}

export class DeleteUserCommand implements ICommand {
  constructor(readonly deleteUserCommandDTO: DeleteUserCommandDataType) {}
}
