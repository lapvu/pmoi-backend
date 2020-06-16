import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { ProjectModule } from 'src/project/project.module';
@Module({
  imports: [
    NotificationModule,
    ProjectModule
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController]
})
export class PortfolioModule { }
