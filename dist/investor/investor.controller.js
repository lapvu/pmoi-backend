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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorController = void 0;
const common_1 = require("@nestjs/common");
const create_account_dto_1 = require("../account/dto/create-account.dto");
const account_service_1 = require("../account/account.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const update_account_dto_1 = require("../account/dto/update-account.dto");
const common_2 = require("../common");
let InvestorController = (() => {
    let InvestorController = class InvestorController {
        constructor(accountService) {
            this.accountService = accountService;
        }
        async create(createAccountDto) {
            return await this.accountService.create(createAccountDto);
        }
        async getList(getListDto) {
            return await this.accountService.getListInvestor(getListDto);
        }
        async getAccount(getDto) {
            return await this.accountService.getInvestor(getDto);
        }
        async delete(deleteAccountDto) {
            return await this.accountService.deleteInvestor(deleteAccountDto);
        }
        async update(getAccountDto, updateAccountDto) {
            return await this.accountService.updateInvestor(getAccountDto, updateAccountDto);
        }
    };
    __decorate([
        common_1.Post(),
        roles_decorator_1.Roles("MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
        __metadata("design:returntype", Promise)
    ], InvestorController.prototype, "create", null);
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles("MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto]),
        __metadata("design:returntype", Promise)
    ], InvestorController.prototype, "getList", null);
    __decorate([
        common_1.Get(":_id"),
        roles_decorator_1.Roles("MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], InvestorController.prototype, "getAccount", null);
    __decorate([
        common_1.Delete(':_id'),
        roles_decorator_1.Roles("MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.DeleteDto]),
        __metadata("design:returntype", Promise)
    ], InvestorController.prototype, "delete", null);
    __decorate([
        common_1.Put(':_id'),
        roles_decorator_1.Roles("MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto, update_account_dto_1.UpdateAccountDto]),
        __metadata("design:returntype", Promise)
    ], InvestorController.prototype, "update", null);
    InvestorController = __decorate([
        common_1.Controller('investor'),
        common_1.UsePipes(new common_1.ValidationPipe()),
        __metadata("design:paramtypes", [account_service_1.AccountService])
    ], InvestorController);
    return InvestorController;
})();
exports.InvestorController = InvestorController;
//# sourceMappingURL=investor.controller.js.map