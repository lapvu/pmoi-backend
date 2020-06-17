import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './interfaces/account.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { convertQueryParams } from "src/utils"
import { GetListDto, DeleteDto, GetDto } from 'src/common';

@Injectable()
export class AccountService {

    constructor(@InjectModel('Account') private accountModel: Model<Account>) { }

    async create(createAccountDto: CreateAccountDto) {
        try {
            let createdUser = new this.accountModel(createAccountDto);
            return await createdUser.save();
        } catch (err) {
            if (err.code === 11000 && err.keyPattern.username === 1) {
                throw new NotFoundException("Tên tài khoản đã tồn tại!");
            }
            if (err.code === 11000 && err.keyPattern.email === 1) {
                throw new NotFoundException("Email đã tồn tại!");
            }
            if (err.code === 11000 && err.keyPattern.investorName === 1) {
                throw new NotFoundException("Chủ đầu tư đã tồn tại!");
            }
            throw new NotFoundException(err);
        }
    }

    async findOneByUsername(username): Promise<Account> {
        return await this.accountModel.findOne({ username });
    }

    async getListAccount(getlistDto: GetListDto, href: string): Promise<any> {
        if (href && href.includes("/project/create")) {
            return await this.getListInvestor(getlistDto)
        }
        const query = convertQueryParams(getlistDto);
        query._filter["accountType"] = { $not: { $eq: "ADMIN" } }
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

    async getListInvestor(getlistDto: GetListDto): Promise<any> {
        const query = convertQueryParams(getlistDto);
        query._filter["accountType"] = "INVESTOR"
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

    async deleteAccount(deleteDto: DeleteDto): Promise<any> {
        const result = await this.accountModel.deleteOne(deleteDto);
        return result;
    }

    async deleteInvestor(deleteDto: DeleteDto): Promise<any> {
        const result = await this.accountModel.deleteOne({ ...deleteDto, accountType: "INVESTOR" });
        return result;
    }

    async getAccount(getDto: GetDto): Promise<any> {
        const result = await this.accountModel.findOne(getDto, { password: 0 });
        return {
            data: result
        };
    }

    async getInvestor(getDto: GetDto): Promise<any> {
        const result = await this.accountModel.findOne({ ...getDto, accountType: "INVESTOR" }, { password: 0 });
        return {
            data: result
        };
    }

    async updateAccount(getADto: GetDto, updateAccountDto: UpdateAccountDto): Promise<any> {
        try {
            const result = await this.accountModel.updateOne(getADto, updateAccountDto)
            return {
                data: result
            }
        } catch (err) {
            if (err.code === 11000 && err.keyPattern.username === 1) {
                throw new NotFoundException("Tên tài khoản đã tồn tại!");
            }
            if (err.code === 11000 && err.keyPattern.email === 1) {
                throw new NotFoundException("Email đã tồn tại!");
            }
            if (err.code === 11000 && err.keyPattern.investorName === 1) {
                throw new NotFoundException("Chủ đầu tư đã tồn tại!");
            }
            throw new NotFoundException(err);
        }
    }

    async updateInvestor(getADto: GetDto, updateAccountDto: UpdateAccountDto): Promise<any> {
        try {
            const result = await this.accountModel.updateOne({ ...getADto, accountType: "INVESTOR" }, updateAccountDto)
            return {
                data: result
            }
        } catch (err) {
            if (err.code === 11000 && err.keyPattern.username === 1) {
                throw new NotFoundException("Tên tài khoản đã tồn tại!");
            }
            if (err.code === 11000 && err.keyPattern.email === 1) {
                throw new NotFoundException("Email đã tồn tại!");
            }
            if (err.code === 11000 && err.keyPattern.investorName === 1) {
                throw new NotFoundException("Chủ đầu tư đã tồn tại!");
            }
            throw new NotFoundException(err);
        }
    }
}