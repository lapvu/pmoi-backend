import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  providers: [InvestmentService],
  controllers: [InvestmentController],
  imports: [ProjectModule]
})
export class InvestmentModule { }
