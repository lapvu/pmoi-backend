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
exports.AccountService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let AccountService = (() => {
    let AccountService = class AccountService {
        constructor(accountModel) {
            this.accountModel = accountModel;
        }
        async create(createAccountDto) {
            try {
                let createdUser = new this.accountModel(createAccountDto);
                return await createdUser.save();
            }
            catch (err) {
                if (err.code === 11000 && err.keyPattern.username === 1) {
                    throw new common_1.NotFoundException("Tên tài khoản đã tồn tại!");
                }
                if (err.code === 11000 && err.keyPattern.email === 1) {
                    throw new common_1.NotFoundException("Email đã tồn tại!");
                }
                throw new common_1.NotFoundException(err);
            }
        }
        async findOneByUsername(username) {
            return await this.accountModel.findOne({ username });
        }
        async getListAccount(getlistDto) {
            const sortOrder = getlistDto.sort[0].split(",");
            const result = await this.accountModel
                .find({ userType: { $not: { $eq: "ADMIN" } } }, { password: 0 })
                .skip(parseInt(getlistDto.offset))
                .limit(parseInt(getlistDto.limit))
                .sort([[sortOrder[0], sortOrder[1] === "ASC" ? -1 : 1]]);
            const total = await this.accountModel.count({});
            return {
                data: result,
                total
            };
        }
        async deleteAccount(deleteAccountDto) {
            const result = await this.accountModel.deleteOne(deleteAccountDto);
            return result;
        }
        async getAccount(getAccountDto) {
            const result = await this.accountModel.findOne(getAccountDto, { password: 0 });
            return {
                data: result
            };
        }
        async updateAccount(getAccountDto, updateAccountDto) {
            if (updateAccountDto.userType = "MINISTRY") {
                updateAccountDto.desc = "";
                updateAccountDto.website = "";
                updateAccountDto.fax = "";
            }
            const result = await this.accountModel.updateOne(getAccountDto, updateAccountDto);
            return {
                data: result
            };
        }
    };
    AccountService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_2.InjectModel('Account')),
        __metadata("design:paramtypes", [mongoose_1.Model])
    ], AccountService);
    return AccountService;
})();
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map