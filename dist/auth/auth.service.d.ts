import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../account/dto/login-account.dto';
import { AccountService } from '../account/account.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private accountService;
    private jwtService;
    constructor(accountService: AccountService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginDto): Promise<{
        expiresIn: number;
        roles: any;
        _id: any;
        token: string;
    }>;
    validateUserByJwt(payload: JwtPayload): Promise<import("../account/interfaces/account.interface").Account>;
    createJwtPayload(user: any): {
        expiresIn: number;
        roles: any;
        _id: any;
        token: string;
    };
}
