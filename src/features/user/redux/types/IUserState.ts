export interface IUserState {
  user: {
    userId: number,
    token: string,
    role: string,
  },
  error?: string;
}
