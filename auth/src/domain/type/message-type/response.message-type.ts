export const grpcStatus = {
  OK : 0,
  CANCELLED : 1,
  UNKNOWN : 2,
  INVALID_ARGUMENT : 3,
  DEADLINE_EXCEEDED:4,
  NOT_FOUND: 5,
  ALREADY_EXISTS : 6,
  PERMISSION_DENIED: 7,
} as const;

export type GrpcStatusType = typeof grpcStatus[keyof typeof grpcStatus]

export interface GrpcStatusData {
  readonly grpcStatus : GrpcStatusType
}