import { Controller, UseGuards, Get, Request, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async get(@Request() req) {
        return this.notificationService.getListNotification(req.user);
    }

    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Request() req) {
        return this.notificationService.updateNotification(req.user);
    }
}
