import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    });
  }

  verifyToken(token: string): { userId: string } {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  }
}

export const authService = new AuthService();
