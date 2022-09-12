import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken'
import { SECRET } from 'src/config';
// import { getRepository } from 'typeorm'
// import { User } from '../../modules/user/entities/user.entity'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && authHeaders == SECRET) {
      try {
        // console.log('AuthMiddleware check: ', authHeaders);

        next();
      } catch (ex) {
        console.log(ex);
        throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
      }
    } else {
      // console.log('authHeaders', authHeaders, { SECRET });
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
