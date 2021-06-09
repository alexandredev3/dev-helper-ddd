export interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  tags: string[];
}

export interface ICreateUserDTOResponse {
  id: string | number;
  name: string;
  username: string;
}
