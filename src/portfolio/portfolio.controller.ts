import { Controller, Get, UseGuards, Query, Request, Post, UseInterceptors, UploadedFile, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
@Controller('portfolio')
export class PortfolioController {
    constructor(private portfolioService: PortfolioService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload/contract',
            filename: (req, file, callback) => {
                const [name, type] = file.originalname.split('.');
                const randomName = Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                callback(null, `${name}-${randomName}.${type}`);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file) {
        return file;
    }

    @Get("/upload/contract/:pdfPath")
    async getImage(@Param("pdfPath") pdf, @Res() res) {
        return res.sendFile(pdf, { root: "upload/contract" })
    }

    @Get()
    @Roles("INVESTOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto, @Request() req) {
        return await this.portfolioService.getListPortfolio(getListDto, req.user);
    }

    @Get(":_id")
    @Roles("INVESTOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async get(@Param() getDto: GetDto, @Request() req) {
        return await this.portfolioService.getPortfolio(getDto, req.user);
    }

    @Post()
    @Roles("INVESTOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() createPortfolioDto: CreatePortfolioDto, @Request() req) {
        return await this.portfolioService.createPortfolio(createPortfolioDto);
    }

    @Put(":_id")
    @Roles("INVESTOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Body() updatePortfolioDto: UpdatePortfolioDto, @Param() getDto: GetDto) {
        return await this.portfolioService.updatePortfolio(updatePortfolioDto, getDto);
    }

    @Delete(":_id")
    @Roles("INVESTOR")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteDto: DeleteDto, @Request() req) {
        return await this.portfolioService.deletePortfolio(deleteDto, req.user);
    }
}
