export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IResponseLoginApi {
  userId: number;
  token: string;
  role: string;
}

export interface IRequestLoginSuccess {
  userId: number;
  token: string;
  role: string;
}

export interface IRequestUserError {
  message: string;

}
