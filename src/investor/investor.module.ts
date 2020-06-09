import { Module } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { InvestorController } from './investor.controller';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [AccountModule],
  providers: [InvestorService],
  controllers: [InvestorController]
})
export class InvestorModule { }
