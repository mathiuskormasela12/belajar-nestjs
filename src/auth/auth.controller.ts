// ========== Import All Modules

import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public register() {
    return this.authService.register();
    // return {
    //   type: 'success',
    //   message: 'This is a register endpoint',
    // };
  }

  @Post('login')
  public login() {
    return this.authService.login();
    // return {
    //   type: 'success',
    //   message: 'This is a login endpoint',
    // };
  }
}
