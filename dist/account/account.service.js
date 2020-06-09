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
const utils_1 = require("../utils");
const common_2 = require("../common");
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
                if (err.code === 11000 && err.keyPattern.investorName === 1) {
                    throw new common_1.NotFoundException("Chủ đầu tư đã tồn tại!");
                }
                throw new common_1.NotFoundException(err);
            }
        }
        async findOneByUsername(username) {
            return await this.accountModel.findOne({ username });
        }
        async getListAccount(getlistDto) {
            const query = utils_1.convertQueryParams(getlistDto);
            query._filter["accountType"] = { $not: { $eq: "ADMIN" } };
            const result = await this.accountModel
                .find(query._filter, { password: 0 })
                .skip(query._offset)
                .limit(query._limit)
                .sort(query._sort);
            const total = await this.accountModel.count(query._filter);
            return {
                data: result,
                total
            };
        }
        async getListInvestor(getlistDto) {
            const query = utils_1.convertQueryParams(getlistDto);
            query._filter["accountType"] = "INVESTOR";
            const result = await this.accountModel
                .find(query._filter, { password: 0 })
                .skip(query._offset)
                .limit(query._limit)
                .sort(query._sort);
            const total = await this.accountModel.count(query._filter);
            return {
                data: result,
                total
            };
        }
        async deleteAccount(deleteDto) {
            const result = await this.accountModel.deleteOne(deleteDto);
            return result;
        }
        async deleteInvestor(deleteDto) {
            const result = await this.accountModel.deleteOne(Object.assign(Object.assign({}, deleteDto), { accountType: "INVESTOR" }));
            return result;
        }
        async getAccount(getDto) {
            const result = await this.accountModel.findOne(getDto, { password: 0 });
            return {
                data: result
            };
        }
        async getInvestor(getDto) {
            const result = await this.accountModel.findOne(Object.assign(Object.assign({}, getDto), { accountType: "INVESTOR" }), { password: 0 });
            return {
                data: result
            };
        }
        async updateAccount(getADto, updateAccountDto) {
            const result = await this.accountModel.updateOne(getADto, updateAccountDto);
            return {
                data: result
            };
        }
        async updateInvestor(getADto, updateAccountDto) {
            const result = await this.accountModel.updateOne(Object.assign(Object.assign({}, getADto), { accountType: "INVESTOR" }), updateAccountDto);
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