import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { GetListDto } from './dto/list-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    create(createAccountDto: CreateAccountDto): Promise<import("./interfaces/account.interface").Account>;
    getList(getListDto: GetListDto): Promise<any>;
    getAccount(getAccountDto: GetAccountDto): Promise<any>;
    delete(deleteAccountDto: DeleteAccountDto): Promise<any>;
    update(getAccountDto: GetAccountDto, updateAccountDto: UpdateAccountDto): Promise<any>;
}
