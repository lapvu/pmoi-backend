import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../account/dto/login-account.dto';
import { AccountService } from '../account/account.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private accountService: AccountService, private jwtService: JwtService) { }

    async validateUserByPassword(loginAttempt: LoginDto) {
        try {
            let accountToAttempt: any = await this.accountService.findOneByUsername(loginAttempt.username);

            if (!accountToAttempt) throw new UnauthorizedException("username or password does not match");

            const isMatch = await bcrypt.compare(loginAttempt.password, accountToAttempt.password)
            if (isMatch) {
                return this.createJwtPayload(accountToAttempt)
            } else {
                throw new UnauthorizedException("username or password does not match");
            }
        } catch (err) {
            throw new UnauthorizedException("username or password does not match");
        }
    }

    async validateUserByJwt(payload: JwtPayload) {
        let user = await this.accountService.findOneByUsername(payload.username);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        let data: JwtPayload = {
            username: user.username,
            roles: user.roles,
            _id: user._id
        };
        let jwt = this.jwtService.sign(data);
        return {
            expiresIn: 18000,
            roles: user.roles,
            _id: user._id,
            token: jwt
        }
    }
}