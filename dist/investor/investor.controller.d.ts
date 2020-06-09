import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
export declare class InvestorController {
    private accountService;
    constructor(accountService: AccountService);
    create(createAccountDto: CreateAccountDto): Promise<import("../account/interfaces/account.interface").Account>;
    getList(getListDto: GetListDto): Promise<any>;
    getAccount(getDto: GetDto): Promise<any>;
    delete(deleteAccountDto: DeleteDto): Promise<any>;
    update(getAccountDto: GetDto, updateAccountDto: UpdateAccountDto): Promise<any>;
}
