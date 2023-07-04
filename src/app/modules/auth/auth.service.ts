import { ILogin } from './auth.interface';

const authLogin = async (payload: ILogin) => {
  console.log(payload);
};

export const AuthService = { authLogin };
