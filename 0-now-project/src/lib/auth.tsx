import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  username?: string;
  isAdmin?: boolean;
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}
