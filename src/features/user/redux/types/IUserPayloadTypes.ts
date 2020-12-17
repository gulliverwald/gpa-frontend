export interface IRequestLogin {
  type: string;
  payload: {
    email: string;
    password: string;
  }
}

export interface IResponseLoginApi {
  userId: number;
  token: string;
  role: string;
}

export interface IRequestLoginSuccess {
  type: string;
  payload: {
    userId: number;
    token: string;
    role: string;
  }
}

export interface IRequestUserError {
  type: string;
  payload: {
    message: string;
  }
}
