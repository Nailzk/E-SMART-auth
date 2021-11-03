import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction): void {
    const token: string = req.cookies.access_token;
    const payload = this.jwtService.decode(token);

    process.stdout.write("Hello World\n"); 
    this.logger.log(`payload ${payload}`);

    next();
    // res.sendStatus(401);
  }
}