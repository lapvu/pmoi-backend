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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_2 = require("../common");
const portfolio_service_1 = require("./portfolio.service");
const create_portfolio_dto_1 = require("./dto/create-portfolio.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const update_portfolio_dto_1 = require("./dto/update-portfolio.dto");
let PortfolioController = (() => {
    let PortfolioController = class PortfolioController {
        constructor(portfolioService) {
            this.portfolioService = portfolioService;
        }
        async uploadFile(file) {
            return file;
        }
        async getImage(pdf, res) {
            return res.sendFile(pdf, { root: "upload/contract" });
        }
        async getList(getListDto, req) {
            return await this.portfolioService.getListPortfolio(getListDto, req.user);
        }
        async get(getDto, req) {
            return await this.portfolioService.getPortfolio(getDto, req.user);
        }
        async create(createPortfolioDto, req) {
            return await this.portfolioService.createPortfolio(createPortfolioDto);
        }
        async update(updatePortfolioDto, getDto) {
            return await this.portfolioService.updatePortfolio(updatePortfolioDto, getDto);
        }
        async delete(deleteDto, req) {
            return await this.portfolioService.deletePortfolio(deleteDto, req.user);
        }
    };
    __decorate([
        common_1.Post('upload'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
            storage: multer_1.diskStorage({
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
        })),
        __param(0, common_1.UploadedFile()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "uploadFile", null);
    __decorate([
        common_1.Get("/upload/contract/:pdfPath"),
        __param(0, common_1.Param("pdfPath")), __param(1, common_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "getImage", null);
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles("INVESTOR"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto, Object]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "getList", null);
    __decorate([
        common_1.Get(":_id"),
        roles_decorator_1.Roles("INVESTOR"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto, Object]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "get", null);
    __decorate([
        common_1.Post(),
        roles_decorator_1.Roles("INVESTOR"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_portfolio_dto_1.CreatePortfolioDto, Object]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "create", null);
    __decorate([
        common_1.Put(":_id"),
        roles_decorator_1.Roles("INVESTOR"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()), __param(1, common_1.Param()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [update_portfolio_dto_1.UpdatePortfolioDto, common_2.GetDto]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "update", null);
    __decorate([
        common_1.Delete(":_id"),
        roles_decorator_1.Roles("INVESTOR"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Param()), __param(1, common_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.DeleteDto, Object]),
        __metadata("design:returntype", Promise)
    ], PortfolioController.prototype, "delete", null);
    PortfolioController = __decorate([
        common_1.Controller('portfolio'),
        __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
    ], PortfolioController);
    return PortfolioController;
})();
exports.PortfolioController = PortfolioController;
//# sourceMappingURL=portfolio.controller.js.map