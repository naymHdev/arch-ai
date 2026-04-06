import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      // TODO: Check if user exists, save to DB
      const hashed = await authService.hashPassword(password);
      const token = authService.generateToken('placeholder-user-id');
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      // TODO: Fetch user from DB, verify password
      const token = authService.generateToken('placeholder-user-id');
      res.json({ token });
    } catch (err) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}

export const authController = new AuthController();
