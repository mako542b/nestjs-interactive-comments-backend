import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/user.schema';
import { tokenDokument } from './refresh-tokens.schema';

import { Request } from 'express'
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';

const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  if(req && req.cookies) {
    if(req.cookies['refresh']) return req.cookies['refresh']
  }
  return null
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectModel('UserSchema') private User: Model<UserDocument>,
    @InjectModel('tokenSchema') private Token: Model<tokenDokument>
    ){
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshSecret,
      passReqToCallback: true
    });
  }

  async validate(req: any, payload: any) {

    const user = await this.User.findById(payload.sub)
    const sendToken = req.cookies['refresh']
    const tokenInDb = await this.Token.findOne({userId: payload.sub})
    if(!tokenInDb || tokenInDb?.token !== sendToken) throw new HttpException('Forbidden', 401);
    const {password, ...result} = user?.toObject()
    return result
  }

}
