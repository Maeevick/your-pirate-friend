// src/infrastructure/controllers/auth.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SignUpDto, SignInDto, SignOutDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor() {} // Inject dependencies later

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async postSignUp(@Body() signUpDto: SignUpDto) {
    // Implementation will be added later
    console.debug('Sign up request received', signUpDto);
    return { message: 'Sign up endpoint reached' };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async postSignIn(@Body() signInDto: SignInDto) {
    // Implementation will be added later
    console.debug('Sign in request received', signInDto);
    return { message: 'Sign in endpoint reached' };
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async postSignOut(@Body() signOutDto: SignOutDto) {
    // Implementation will be added later
    console.debug('Sign out request received', signOutDto);
    return { message: 'Sign out endpoint reached' };
  }
}
