import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenDokument } from './refresh-tokens.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService,
        @InjectModel('tokenSchema') private Token: Model<tokenDokument>
    ) {}

    async validateUser(username: string, password: string) : Promise<any> {
        const user = await this.usersService.findOne(username, true)
        if(!user) return null
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(isValidPassword) {
            const {password, ...result} = user.toObject()
            return result
        }
        return null
    }

    async createRefreshToken(user: any) {
      const payload = { username: user.login, sub: user._id };
      const options = { expiresIn: '100m', secret: jwtConstants.refreshSecret }
      const refreshToken = this.jwtService.sign(payload, options)
      await this.Token.findOneAndDelete({userId: user._id})
      const newToken = new this.Token({token: refreshToken, userId: user._id})
      await newToken.save()
      return refreshToken
    }

    async logout(user: any) {
      return await this.Token.findOneAndDelete({userId: user._id})
    }

    async login(user: any) {
        const payload = { username: user.login, sub: user._id };
        const options = { expiresIn: '100s', secret: jwtConstants.secret }
        return {
          access_token: this.jwtService.sign(payload, options),
        };
      }
}
