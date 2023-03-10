import { Controller, UseGuards, Post, Request, Get, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { get } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({passthrough:true}) res: Response){
    const token = await this.authService.login(req.user)
    const refreshToken = await this.authService.createRefreshToken(req.user)
    res.cookie('refresh', refreshToken, {expires: new Date(Date.now() + 90000000), sameSite:'none'})
    return token
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async refreshToken(@Request() req) {
    const token = await this.authService.login(req.user)
    return token
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('logout')
  async logout(@Request() req) {
    return await this.authService.logout(req.user)
  }
  
}
