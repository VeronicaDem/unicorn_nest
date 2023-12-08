export interface IAuth {
  accessToken: string | null;
  accessTokenExpiresAt: Date;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
}
