import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  signUp(@Body() body: { username: string; email: string; password: string }) {
    return this.authService.registerNewUser(
      body.username,
      body.email,
      body.password,
    );
  }

  @Public()
  @Post('/sign-in')
  signIn(@Body() body: { email: string; pass: string }) {
    return this.authService.logInUser(body.email, body.pass);
  }

  @Public()
  @Post('/refresh')
  refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @Public()
  @Post('/check_token')
  check(@Body() body: { access_token: string }) {
    return this.authService.checkAccessToken(body.access_token);
  }

  @Get('/user-data')
  getCurrentData(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getUserData(token);
  }
}
