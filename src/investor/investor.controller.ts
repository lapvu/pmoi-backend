import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe, Delete, Param, Query, Put, } from '@nestjs/common';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { AccountService } from 'src/account/account.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';

@Controller('investor')
@UsePipes(new ValidationPipe())
export class InvestorController {
    constructor(private accountService: AccountService) { }
    @Post()
    @Roles("MINISTRY")
    async create(@Body() createAccountDto: CreateAccountDto) {
        return await this.accountService.create(createAccountDto);
    }

    @Get()
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto) {
        return await this.accountService.getListInvestor(getListDto);
    }

    @Get(":_id")
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAccount(@Param() getDto: GetDto) {
        return await this.accountService.getInvestor(getDto);
    }

    @Delete(':_id')
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteAccountDto: DeleteDto) {
        return await this.accountService.deleteInvestor(deleteAccountDto);
    }

    @Put(':_id')
    @Roles("MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param() getAccountDto: GetDto, @Body() updateAccountDto: UpdateAccountDto) {
        return await this.accountService.updateInvestor(getAccountDto, updateAccountDto);
    }
}
