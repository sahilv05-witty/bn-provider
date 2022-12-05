import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './modules/users/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/users/guards/local-auth.guard';
import { UsersService } from './modules/users/users.service';

@Controller()
export class AppController {
  constructor(private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('test/login')
  async login(@Request() req) {
    return this.userService.login(req.email, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}