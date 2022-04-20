export interface IAuthenticationDTO {
  email: string;
  password: string;
}

export interface IAuthenticationDTOResponse {
  accessToken: string;
  refreshToken: string;
}
