export interface LocalLoginDataType {
  readonly userEmailId : string
  readonly userPassword : string
}

export interface JWTTokenDataType {
  readonly accessToken :string
  readonly refreshToken : string
}