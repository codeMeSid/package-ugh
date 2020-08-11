import jwt from "jsonwebtoken";
import { UserPayload } from "../interfaces/user-payload";

export const generateToken = async (
  object: UserPayload,
  key: string
): Promise<string> => {
  const token = await jwt.sign(object, key);
  return token;
};

export const decodeToken = (
  token: string,
  secret: string
): UserPayload | undefined => {
  const payload = jwt.verify(token, secret) as UserPayload;
  return payload;
};
