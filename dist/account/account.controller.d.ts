import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    create(createAccountDto: CreateAccountDto): Promise<import("./interfaces/account.interface").Account>;
    getList(getListDto: GetListDto, href: any): Promise<any>;
    getAccount(getDto: GetDto): Promise<any>;
    delete(deleteAccountDto: DeleteDto): Promise<any>;
    update(getAccountDto: GetDto, updateAccountDto: UpdateAccountDto): Promise<any>;
}
