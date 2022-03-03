import { Injectable } from '@nestjs/common';
import { ExtraService } from './extraService.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ExtraServiceRepository } from './extraService.repository';
import { Room } from 'src/room/room.entity';

@Injectable()
export class ExtraServiceService extends TypeOrmCrudService<ExtraService>{
  constructor(
    private readonly extraServiceRepository: ExtraServiceRepository
  ) {super(extraServiceRepository);}

  async getServicesRoom(room: Room) {
    return await this.extraServiceRepository.getServicesRoom(room);
  } 

}