import { Model } from 'mongoose';
import { Account } from './interfaces/account.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { GetListDto } from './dto/list-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountService {
    private accountModel;
    constructor(accountModel: Model<Account>);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findOneByUsername(username: any): Promise<Account>;
    getListAccount(getlistDto: GetListDto): Promise<any>;
    deleteAccount(deleteAccountDto: DeleteAccountDto): Promise<any>;
    getAccount(getAccountDto: GetAccountDto): Promise<any>;
    updateAccount(getAccountDto: GetAccountDto, updateAccountDto: UpdateAccountDto): Promise<any>;
}
