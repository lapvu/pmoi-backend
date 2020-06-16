import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    get(req: any): Promise<any>;
    update(req: any): Promise<any>;
}
