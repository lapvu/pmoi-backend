import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { ProjectModule } from 'src/project/project.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [GuestService],
  controllers: [GuestController],
  imports: [ProjectModule, AccountModule]
})
export class GuestModule { }
