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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: '1016564',
    key: 'f6e6b90838dcfbee0d31',
    secret: '059d1516aabe1a40a177',
    cluster: 'ap1',
    encrypted: true
});
let NotificationService = (() => {
    let NotificationService = class NotificationService {
        constructor(notificationModel) {
            this.notificationModel = notificationModel;
        }
        async getListNotification(user) {
            if (user.accountType === "INVESTOR") {
                let data = await this.notificationModel.find({ recipients: user._id });
                return {
                    data,
                    total: data.length
                };
            }
            else {
                let data = await this.notificationModel.find({});
                return {
                    data,
                    total: data.length
                };
            }
        }
        async pushNotification(createNotificationDto) {
            let notification = new this.notificationModel(createNotificationDto);
            let data = await notification.save();
            let channel = createNotificationDto.recipients === "all" ? "notification" : createNotificationDto.recipients;
            pusher.trigger(channel, 'push', data);
        }
        async updateNotification(user) {
            if (user.accountType === "INVESTOR") {
                let u = await this.notificationModel.updateMany({ recipients: user._id }, { $push: { seen: user._id } });
                let data = await this.notificationModel.find({ recipients: user._id });
                return {
                    data,
                    total: data.length
                };
            }
            else {
                let u = await this.notificationModel.updateMany({}, { $push: { seen: user._id } });
                let data = await this.notificationModel.find({});
                return {
                    data,
                    total: data.length
                };
            }
        }
    };
    NotificationService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Notification')),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], NotificationService);
    return NotificationService;
})();
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map