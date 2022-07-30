export interface UserEntityType {
  readonly userUUID: string;

  readonly userEmailId: string;

  readonly userPassword: string;

  readonly userJWTRefreshToken: string;

  readonly lastActivate: Date;

  readonly accessLevel: number;
}
