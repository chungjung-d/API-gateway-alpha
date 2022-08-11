export const MessageQueueState = {
  COMMIT: 'commit',
  ROLLBACK: 'rollback',
};

export type MessageQueueStateType =
  typeof MessageQueueState[keyof typeof MessageQueueState];

export interface MessageQueueStateDataType {
  readonly messageQueueState: MessageQueueStateType;
}
