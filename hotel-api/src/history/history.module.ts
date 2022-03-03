import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { HistoryController } from './history.controller';
import { HistoryRepository } from './history.repository';
import { HistoryService } from './history.service';
import { History } from './history.entity';


@Module({
  imports: [History, TypeOrmModule.forFeature([HistoryRepository])],
  controllers: [HistoryController],
  providers: [HistoryService, JwtAuthGuard],
  exports: [HistoryService],
})
export class HistoryModule {}