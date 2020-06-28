import { Controller, Get, Post, UseGuards, Query, Body, Put, Delete } from '@nestjs/common';
import { DisbursementService } from './disbursement.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListDto, GetDto } from 'src/common';
import { CreateDisbursementDto } from './dto/create-disbursement.dto';
import { UpdateDisbursementDto } from './dto/update-disbursement.dto';

@Controller('disbursement')
export class DisbursementController {
    constructor(private disbursementService: DisbursementService) { }

    @Post()
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    create(@Body() createDisbursementDto: CreateDisbursementDto) {
        return this.disbursementService.createDisbursement(createDisbursementDto)
    }

    @Get()
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    getList(@Query() getListDto: GetListDto) {
        return this.disbursementService.getListDisbursement(getListDto);
    }

    @Get(":_id")
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    get(@Query() getDto: GetDto) {
        return this.disbursementService.getDisbursement(getDto);
    }

    @Put(":_id")
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    update(@Query() getDto: GetDto, @Body() updateDisbursementDto: UpdateDisbursementDto) {
        return this.disbursementService.updateDisbursement(getDto, updateDisbursementDto);
    }

    @Delete(":_id")
    @Roles("ADMIN", "MINISTRY")
    @UseGuards(JwtAuthGuard, RolesGuard)
    delete(@Query() getDto: GetDto) {
        return   this.disbursementService.deleteDisbursement(getDto);
    }
}
