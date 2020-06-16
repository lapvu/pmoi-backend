import { Model, Document } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<Document>);
    getListNotification(user: any): Promise<any>;
    pushNotification(createNotificationDto: CreateNotificationDto): Promise<any>;
    updateNotification(user: any): Promise<any>;
}
