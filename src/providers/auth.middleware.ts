import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.access_token;
    const payload = this.jwtService.decode(token);

    if (payload && typeof payload !== 'string') {
      (req as any).user = {
        id: payload?.id,
        role: payload?.role
      }
    } else if (process.env.ALWAYS_AUTHORIZE == 'true' && !payload) {
      res.sendStatus(401);
      return;
    }

    next();
  }
}