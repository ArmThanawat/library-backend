import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/member')
  loginMember(@Body() dto: LoginDto) {
    return this.authService.loginMember(dto);
  }

  @Post('login/librarian')
  loginLibrarian(@Body() dto: LoginDto) {
    return this.authService.loginLibrarian(dto);
  }

  @Post('register/member')
  registerMember(@Body() dto: RegisterDto) {
    return this.authService.registerMember(dto);
  }

  @Post('register/librarian')
  registerLibrarian(@Body() dto: RegisterDto) {
    return this.authService.registerLibrarian(dto);
  }
}
