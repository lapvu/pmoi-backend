import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/account/dto/login-account.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.validateUserByPassword(loginDto);
    }
}
