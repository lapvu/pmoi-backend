import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import * as Pusher from 'pusher';
import { CreateNotificationDto } from './dto/create-notification.dto';


const pusher = new Pusher({
    appId: '1016564',
    key: 'f6e6b90838dcfbee0d31',
    secret: '059d1516aabe1a40a177',
    cluster: 'ap1',
    encrypted: true
});

@Injectable()
export class NotificationService {
    constructor(@InjectModel('Notification') private notificationModel: Model<Document>) { }

    async getListNotification(user: any): Promise<any> {
        if (user.accountType === "INVESTOR") {
            let data = await this.notificationModel.find({ recipients: user._id });
            return {
                data,
                total: data.length
            }
        }
        else {
            let data = await this.notificationModel.find({});
            return {
                data,
                total: data.length
            }
        }
    }

    async pushNotification(createNotificationDto: CreateNotificationDto): Promise<any> {
        let notification = new this.notificationModel(createNotificationDto);
        let data = await notification.save();
        let channel = createNotificationDto.recipients === "all" ? "notification" : createNotificationDto.recipients;
        pusher.trigger(channel, 'push', data);
    }

    async updateNotification(user: any): Promise<any> {
        if (user.accountType === "INVESTOR") {
            let u = await this.notificationModel.updateMany({ recipients: user._id }, { $push: { seen: user._id } });
            let data = await this.notificationModel.find({ recipients: user._id });
            return {
                data,
                total: data.length
            }
        }
        else {
            let u = await this.notificationModel.updateMany({}, { $push: { seen: user._id } });
            let data = await this.notificationModel.find({});
            return {
                data,
                total: data.length
            }
        }
    }
}
