import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from './jwt-refresh.strategy'
import { TokenSchema } from './refresh-tokens.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: {expiresIn: '120s'}
    }),
    MongooseModule.forFeature([{name: 'tokenSchema', schema: TokenSchema}])
  ],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
