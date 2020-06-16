import { ProjectService } from 'src/project/project.service';
import { DeleteDto, GetDto, GetListDto } from 'src/common';
import { CreateReportDto } from './dto/create-report.dto';
import { NotificationService } from 'src/notification/notification.service';
export declare class ReportService {
    private projectService;
    private notificationService;
    constructor(projectService: ProjectService, notificationService: NotificationService);
    createReport(createReportDto: CreateReportDto, user: any): Promise<any>;
    getListReport(getListDto: GetListDto, user: any): Promise<any>;
    getReport(getDto: GetDto): Promise<any>;
    deleteReport(deleteDto: DeleteDto, user: any): Promise<any>;
}
