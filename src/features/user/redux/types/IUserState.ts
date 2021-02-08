export interface IUserState {
  userInfo: {
    user: {
      id: number;
      email: string;
      name: string;
      crn: string;
    },
    token: string,
    role: string,
  },
  error?: string;
}
