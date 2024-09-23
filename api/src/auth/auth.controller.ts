import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  SignUpDto,
  SignInDto,
  SignOutDto,
  SignUpInResponseDto,
  SignOutResponseDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: SignUpInResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async postSignUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in the user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: SignUpInResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async postSignIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out the user' })
  @ApiBody({ type: SignOutDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed out',
    type: SignOutResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async postSignOut(@Body() signOutDto: SignOutDto) {
    return this.authService.signOut(signOutDto);
  }
}
