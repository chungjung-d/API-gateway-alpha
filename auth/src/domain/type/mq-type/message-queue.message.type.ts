export const CreateTransactionType = {
  DELETE_USER_TRANSACTION: 'delete-user',
} as const;

export const DeleteUserTransactionToAuthType = {
  COMMIT: 'commit',
  ROLLBACK: 'rollback',
};

export const DeleteUserTransactionToUserType = {
  COMMIT: 'commit',
  ROLLBACK: 'rollback',
};

export const DeleteUserTransactionToSagaType = {
  AUTH_SUCCESS: 'auth-success',
  AUTH_FAILED: 'auth-failed',
  USER_SUCCESS: 'user-success',
  USER_FAILED: 'user-failed',
};
