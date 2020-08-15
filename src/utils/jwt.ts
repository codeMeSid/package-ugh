import jwt from "jsonwebtoken";
import { UserPayload } from "../interfaces/user-payload";

export const generateToken = (
  object: UserPayload | string,
  key: string
): string => {
  const token = jwt.sign(object, key);
  return token;
};

export const decodeToken = (
  token: string,
  secret: string
): UserPayload | string | undefined => {
  const payload = jwt.verify(token, secret) as UserPayload | string;
  return payload;
};
