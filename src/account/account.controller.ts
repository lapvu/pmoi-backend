import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe, Delete, Param, Query, Put, } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListDto } from './dto/list-account.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { GetAccountDto } from './dto/get-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
@UsePipes(new ValidationPipe())
export class AccountController {
    constructor(private accountService: AccountService) { }
    @Post()
    async create(@Body() createAccountDto: CreateAccountDto) {
        return await this.accountService.create(createAccountDto);
    }

    @Get()
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto) {
        return await this.accountService.getListAccount(getListDto);
    }

    @Get(":_id")
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAccount(@Param() getAccountDto: GetAccountDto) {
        return await this.accountService.getAccount(getAccountDto);
    }

    @Delete(':_id')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteAccountDto: DeleteAccountDto) {
        return await this.accountService.deleteAccount(deleteAccountDto);
    }


    @Put(':_id')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param() getAccountDto: GetAccountDto, @Body() updateAccountDto: UpdateAccountDto) {
        return await this.accountService.updateAccount(getAccountDto, updateAccountDto);
    }
}
