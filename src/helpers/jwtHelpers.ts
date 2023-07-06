import jwt, { Secret } from 'jsonwebtoken';

const createToken = (data: object, secret: Secret, expire: string) => {
  return jwt.sign(data, secret, { expiresIn: expire });
};
export const JWTHelpers = { createToken };
