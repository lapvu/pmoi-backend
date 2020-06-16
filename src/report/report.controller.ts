import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Delete,
    Param,
    Query,
    Put,
    UseInterceptors,
    UploadedFile,
    Request
} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { diskStorage } from 'multer'
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { ReportService } from './report.service';



@Controller('report')
@UsePipes(new ValidationPipe())
export class ReportController {

    constructor(private reportService: ReportService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload/pdf',
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

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() createReportDto: CreateReportDto, @Request() req: any) {
        return this.reportService.createReport(createReportDto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getList(@Query() getListDto: GetListDto, @Request() req: any) {
        return this.reportService.getListReport(getListDto, req.user)
    }

    @Get(":_id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async get(@Param() getDto: GetDto) {
        return this.reportService.getReport(getDto);
    }

    @Delete(":_id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param() deleteDto: DeleteDto, @Request() req: any) {
        return this.reportService.deleteReport(deleteDto, req.user);
    }
}
