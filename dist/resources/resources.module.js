"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesModule = void 0;
const common_1 = require("@nestjs/common");
const resources_service_1 = require("./resources.service");
const resources_controller_1 = require("./resources.controller");
const mongoose_1 = require("@nestjs/mongoose");
const resources_schema_1 = require("./schema/resources.schema");
let ResourcesModule = (() => {
    let ResourcesModule = class ResourcesModule {
    };
    ResourcesModule = __decorate([
        common_1.Module({
            providers: [resources_service_1.ResourcesService],
            controllers: [resources_controller_1.ResourcesController],
            imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Resources', schema: resources_schema_1.ResourcesSchema }])]
        })
    ], ResourcesModule);
    return ResourcesModule;
})();
exports.ResourcesModule = ResourcesModule;
//# sourceMappingURL=resources.module.js.map