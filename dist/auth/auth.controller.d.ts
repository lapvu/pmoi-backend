import { AuthService } from './auth.service';
import { LoginDto } from 'src/account/dto/login-account.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        expiresIn: number;
        roles: any;
        _id: any;
        token: string;
    }>;
}
