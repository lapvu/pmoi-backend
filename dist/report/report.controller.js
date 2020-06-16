"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_report_dto_1 = require("./dto/create-report.dto");
const multer_1 = require("multer");
const common_2 = require("../common");
const report_service_1 = require("./report.service");
let ReportController = (() => {
    let ReportController = class ReportController {
        constructor(reportService) {
            this.reportService = reportService;
        }
        async uploadFile(file) {
            return file;
        }
        async create(createReportDto, req) {
            return this.reportService.createReport(createReportDto, req.user);
        }
        async getList(getListDto, req) {
            return this.reportService.getListReport(getListDto, req.user);
        }
        async get(getDto) {
            return this.reportService.getReport(getDto);
        }
        async delete(deleteDto, req) {
            return this.reportService.deleteReport(deleteDto, req.user);
        }
    };
    __decorate([
        common_1.Post('upload'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
            storage: multer_1.diskStorage({
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
        })),
        __param(0, common_1.UploadedFile()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ReportController.prototype, "uploadFile", null);
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto, Object]),
        __metadata("design:returntype", Promise)
    ], ReportController.prototype, "create", null);
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto, Object]),
        __metadata("design:returntype", Promise)
    ], ReportController.prototype, "getList", null);
    __decorate([
        common_1.Get(":_id"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], ReportController.prototype, "get", null);
    __decorate([
        common_1.Delete(":_id"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.DeleteDto, Object]),
        __metadata("design:returntype", Promise)
    ], ReportController.prototype, "delete", null);
    ReportController = __decorate([
        common_1.Controller('report'),
        common_1.UsePipes(new common_1.ValidationPipe()),
        __metadata("design:paramtypes", [report_service_1.ReportService])
    ], ReportController);
    return ReportController;
})();
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map