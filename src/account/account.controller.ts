import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe, Delete, Param, Query, Put, Req, } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';

@Controller('account')
@UsePipes(new ValidationPipe())
export class AccountController {
    constructor(private accountService: AccountService) { }
    @Post()
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() createAccountDto: CreateAccountDto) {
        return await this.accountService.create(createAccountDto);
    }

    @Get()
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto, @Query('_href') href) {
        return await this.accountService.getListAccount(getListDto, href);
    }

    @Get(":_id")
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAccount(@Param() getDto: GetDto) {
        return await this.accountService.getAccount(getDto);
    }

    @Delete(':_id')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteAccountDto: DeleteDto) {
        return await this.accountService.deleteAccount(deleteAccountDto);
    }


    @Put(':_id')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param() getAccountDto: GetDto, @Body() updateAccountDto: UpdateAccountDto) {
        return await this.accountService.updateAccount(getAccountDto, updateAccountDto);
    }
}
