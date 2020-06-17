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
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_2 = require("../common");
const utils_1 = require("../utils");
let ResourcesService = (() => {
    let ResourcesService = class ResourcesService {
        constructor(resourcesModel) {
            this.resourcesModel = resourcesModel;
        }
        async createResources(createResourcesDto) {
            let res = new this.resourcesModel(Object.assign({}, createResourcesDto));
            let data = await res.save();
            return {
                data
            };
        }
        async getListResources(getlistDto) {
            const query = utils_1.convertQueryParams(getlistDto);
            const result = await this.resourcesModel
                .find(query._filter)
                .skip(query._offset)
                .limit(query._limit)
                .sort(query._sort);
            const total = await this.resourcesModel.count(query._filter);
            return {
                data: result,
                total
            };
        }
        async getResources(getDto) {
            let data = await this.resourcesModel.findOne(getDto);
            return {
                data
            };
        }
        async updateResources(getDto, updateResourcesDto) {
            let result = await this.resourcesModel.updateOne(getDto, updateResourcesDto);
            return {
                data: result
            };
        }
        async deleteResources(deleteDto) {
            let data = await this.resourcesModel.deleteOne(deleteDto);
            return {
                data
            };
        }
    };
    ResourcesService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Resources')),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], ResourcesService);
    return ResourcesService;
})();
exports.ResourcesService = ResourcesService;
//# sourceMappingURL=resources.service.js.map