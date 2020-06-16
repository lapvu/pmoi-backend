import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schema/account.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]), NotificationModule],
  providers: [AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule { }
