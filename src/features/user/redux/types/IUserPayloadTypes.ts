export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IResponseLoginApi {
  user: {
    id: number;
    crn: string;
    email: string;
    name: string;
  };
  token: string;
  role: string;
}

export interface IRequestLoginSuccess {
  user: {
    id: number;
    crn: string;
    email: string;
    name: string;
  };
  token: string;
  role: string;
}

export interface IRequestUserError {
  message: string;

}
