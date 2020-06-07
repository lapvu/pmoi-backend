import { Model } from 'mongoose';
import { Account } from './interfaces/account.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetListDto, DeleteDto, GetDto } from 'src/common';
export declare class AccountService {
    private accountModel;
    constructor(accountModel: Model<Account>);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findOneByUsername(username: any): Promise<Account>;
    getListAccount(getlistDto: GetListDto): Promise<any>;
    deleteAccount(deleteDto: DeleteDto): Promise<any>;
    getAccount(getDto: GetDto): Promise<any>;
    updateAccount(getADto: GetDto, updateAccountDto: UpdateAccountDto): Promise<any>;
}
