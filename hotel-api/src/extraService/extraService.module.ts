import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraServiceController } from './extraService.controller';
import { ExtraServiceRepository } from './extraService.repository';
import { ExtraServiceService } from './extraService.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExtraServiceRepository])],
  controllers: [ExtraServiceController],
  providers: [ExtraServiceService],
  exports: [ExtraServiceService],
})
export class ExtraServiceModule {}