import { Model } from 'mongoose';
import { Injectable, NotFoundException, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './interfaces/account.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { GetListDto } from './dto/list-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

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
            throw new NotFoundException(err);
        }
    }

    async findOneByUsername(username): Promise<Account> {
        return await this.accountModel.findOne({ username });
    }

    async getListAccount(getlistDto: GetListDto): Promise<any> {
        const sortOrder = getlistDto.sort[0].split(",");
        const result = await this.accountModel
            .find({ userType: { $not: { $eq: "ADMIN" } } }, { password: 0 })
            .skip(parseInt(getlistDto.offset))
            .limit(parseInt(getlistDto.limit))
            .sort([[sortOrder[0], sortOrder[1] === "ASC" ? -1 : 1]]);
        const total = await this.accountModel.count({});
        if (result.length === 0) throw new HttpException({
            status: HttpStatus.NO_CONTENT,
            error: 'No content',
        }, HttpStatus.NO_CONTENT)
        return {
            data: result,
            total
        };
    }

    async deleteAccount(deleteAccountDto: DeleteAccountDto): Promise<any> {
        const result = await this.accountModel.deleteOne(deleteAccountDto);
        return result;
    }

    async getAccount(getAccountDto: GetAccountDto): Promise<any> {
        const result = await this.accountModel.findOne(getAccountDto, { password: 0 });
        return {
            data: result
        };
    }

    async updateAccount(getAccountDto: GetAccountDto, updateAccountDto: UpdateAccountDto): Promise<any> {
        if (updateAccountDto.userType = "MINISTRY") {
            updateAccountDto.desc = "";
            updateAccountDto.website = "";
            updateAccountDto.fax = ""
        }
        const result = await this.accountModel.updateOne(getAccountDto, updateAccountDto)
        return {
            data: result
        }
    }
}