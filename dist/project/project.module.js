"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const mongoose_1 = require("@nestjs/mongoose");
const project_schema_1 = require("./schema/project.schema");
const notification_module_1 = require("../notification/notification.module");
const mongoose_plugin_autoinc_1 = require("mongoose-plugin-autoinc");
let ProjectModule = (() => {
    let ProjectModule = class ProjectModule {
    };
    ProjectModule = __decorate([
        common_1.Module({
            imports: [mongoose_1.MongooseModule.forFeatureAsync([{
                        name: 'Project', useFactory: () => {
                            const schema = project_schema_1.ProjectSchema;
                            schema.plugin(mongoose_plugin_autoinc_1.autoIncrement, "Project");
                            return schema;
                        },
                    }]), notification_module_1.NotificationModule],
            providers: [project_service_1.ProjectService],
            controllers: [project_controller_1.ProjectController],
            exports: [project_service_1.ProjectService]
        })
    ], ProjectModule);
    return ProjectModule;
})();
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map