
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/user.schema';

import { Request } from 'express'

const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  if(req && req.cookies) {
    if(req.cookies['refresh']) return req.cookies['refresh']
  }
  return null
} 

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(@InjectModel('UserSchema') private User: Model<UserDocument>){
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {

    const user = await this.User.findById(payload.sub)
    const {password, ...result} = user.toObject()
    return result
  }
}
