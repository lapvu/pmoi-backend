import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validate(payload: any) {
    const user: any = await this.authService.validateUserByJwt(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      _id: user._id,
      username: user.username,
      roles: user.roles,
      accountType: user.accountType
    };
  }
}