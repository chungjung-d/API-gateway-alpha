export interface AuthEntityType {

  readonly userUUID : string;

  readonly userEmailId : string;

  readonly userPassword: string;

  readonly userJWTRefreshToken : string;

  readonly lastActivate : string;

  readonly accessLevel : number;
}