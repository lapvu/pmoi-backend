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
exports.DisbursementService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../utils");
let DisbursementService = (() => {
    let DisbursementService = class DisbursementService {
        constructor(disbursementModel) {
            this.disbursementModel = disbursementModel;
        }
        async createDisbursement(createDisbursementDto) {
            let disbursement = new this.disbursementModel(createDisbursementDto);
            let data = await disbursement.save();
            return {
                data
            };
        }
        async getListDisbursement(getListDto) {
            const query = utils_1.convertQueryParams(getListDto);
            const result = await this.disbursementModel
                .find(query._filter)
                .populate('projectId', { name: 1 })
                .skip(query._offset)
                .limit(query._limit)
                .sort(query._sort);
            const total = await this.disbursementModel.count(query._filter);
            return {
                data: result,
                total
            };
        }
        async getDisbursement(getDto) {
            let data = await this.disbursementModel.findOne(getDto).populate('projectId', { name: 1 });
            return {
                data
            };
        }
        async updateDisbursement(getDto, updateDisbursementDto) {
            let result = await this.disbursementModel.updateOne(getDto, updateDisbursementDto);
            return {
                data: result
            };
        }
        async deleteDisbursement(deleteDto) {
            let data = await this.disbursementModel.deleteOne(deleteDto);
            return {
                data
            };
        }
    };
    DisbursementService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Disbursement')),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], DisbursementService);
    return DisbursementService;
})();
exports.DisbursementService = DisbursementService;
//# sourceMappingURL=disbursement.service.js.map