import { CreateReportDto } from './dto/create-report.dto';
import { GetListDto, GetDto, DeleteDto } from 'src/common';
import { ReportService } from './report.service';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    uploadFile(file: any): Promise<any>;
    create(createReportDto: CreateReportDto, req: any): Promise<any>;
    getList(getListDto: GetListDto, req: any): Promise<any>;
    get(getDto: GetDto): Promise<any>;
    delete(deleteDto: DeleteDto, req: any): Promise<any>;
}
