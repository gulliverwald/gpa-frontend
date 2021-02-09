export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IResponseLoginApi {
  user: {
    id: number;
    email: string;
    name: string;
    crn?: string;
    access_authorization?: number;
    cpf?: string;
    phone?: string;
    birthday?: Date;
    city_id?: number;
    district?: string;
    street?: string;
    zip?: number;
    number?: number;
    adjunct?: string;
  };
  token: string;
  role: string;
}

export interface IRequestLoginSuccess {
  user: {
    id: number;
    crn?: string;
    access_authorization?: number;
    cpf?: string;
    phone?: string;
    birthday?: Date;
    city_id?: number;
    district?: string;
    street?: string;
    zip?: number;
    number?: number;
    adjunct?: string;
    email: string;
    name: string;
  };
  token: string;
  role: string;
}

export interface IRequestUserError {
  message: string;
}
