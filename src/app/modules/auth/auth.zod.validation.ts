import { z } from 'zod';

const authLogin = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password Faculty is required',
    }),
  }),
});
const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AuthZodSchema = { authLogin, refreshToken };
