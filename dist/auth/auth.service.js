"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const account_service_1 = require("../account/account.service");
let AuthService = (() => {
    let AuthService = class AuthService {
        constructor(accountService, jwtService) {
            this.accountService = accountService;
            this.jwtService = jwtService;
        }
        async validateUserByPassword(loginAttempt) {
            try {
                let accountToAttempt = await this.accountService.findOneByUsername(loginAttempt.username);
                if (!accountToAttempt)
                    throw new common_1.UnauthorizedException("username or password does not match");
                const isMatch = await bcrypt.compare(loginAttempt.password, accountToAttempt.password);
                if (isMatch) {
                    return this.createJwtPayload(accountToAttempt);
                }
                else {
                    throw new common_1.UnauthorizedException("username or password does not match");
                }
            }
            catch (err) {
                throw new common_1.UnauthorizedException("username or password does not match");
            }
        }
        async validateUserByJwt(payload) {
            let user = await this.accountService.findOneByUsername(payload.username);
            if (user) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        createJwtPayload(user) {
            let data = {
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
            };
        }
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [account_service_1.AccountService, jwt_1.JwtService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map