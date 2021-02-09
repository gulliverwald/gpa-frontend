export interface IUserState {
  userInfo: {
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
  };
  error?: string;
}
