export const MessageQueueType = {
  CREATE_TRANSACTION: 'create-transaction',
  DELETE_USER_TRANSACTION_TO_AUTH: 'delete-user-transaction-to-auth',
  DELETE_USER_TRANSACTION_TO_USER: 'delete-user-transaction-to-user',
  DELETE_USER_TRANSACTION_TO_SAGA: 'delete-user-transaction-to-saga',
  REPLY_TRANSACTION: 'reply-transaction',
} as const;
