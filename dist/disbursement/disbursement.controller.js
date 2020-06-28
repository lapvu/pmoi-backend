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
exports.DisbursementController = void 0;
const common_1 = require("@nestjs/common");
const disbursement_service_1 = require("./disbursement.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_2 = require("../common");
const create_disbursement_dto_1 = require("./dto/create-disbursement.dto");
const update_disbursement_dto_1 = require("./dto/update-disbursement.dto");
let DisbursementController = (() => {
    let DisbursementController = class DisbursementController {
        constructor(disbursementService) {
            this.disbursementService = disbursementService;
        }
        create(createDisbursementDto) {
            return this.disbursementService.createDisbursement(createDisbursementDto);
        }
        getList(getListDto) {
            return this.disbursementService.getListDisbursement(getListDto);
        }
        get(getDto) {
            return this.disbursementService.getDisbursement(getDto);
        }
        update(getDto, updateDisbursementDto) {
            return this.disbursementService.updateDisbursement(getDto, updateDisbursementDto);
        }
        delete(getDto) {
            return this.disbursementService.deleteDisbursement(getDto);
        }
    };
    __decorate([
        common_1.Post(),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_disbursement_dto_1.CreateDisbursementDto]),
        __metadata("design:returntype", void 0)
    ], DisbursementController.prototype, "create", null);
    __decorate([
        common_1.Get(),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetListDto]),
        __metadata("design:returntype", void 0)
    ], DisbursementController.prototype, "getList", null);
    __decorate([
        common_1.Get(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", void 0)
    ], DisbursementController.prototype, "get", null);
    __decorate([
        common_1.Put(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto, update_disbursement_dto_1.UpdateDisbursementDto]),
        __metadata("design:returntype", void 0)
    ], DisbursementController.prototype, "update", null);
    __decorate([
        common_1.Delete(":_id"),
        roles_decorator_1.Roles("ADMIN", "MINISTRY"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        __param(0, common_1.Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.GetDto]),
        __metadata("design:returntype", void 0)
    ], DisbursementController.prototype, "delete", null);
    DisbursementController = __decorate([
        common_1.Controller('disbursement'),
        __metadata("design:paramtypes", [disbursement_service_1.DisbursementService])
    ], DisbursementController);
    return DisbursementController;
})();
exports.DisbursementController = DisbursementController;
//# sourceMappingURL=disbursement.controller.js.map