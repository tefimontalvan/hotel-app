import { Injectable } from '@nestjs/common';
import { History} from './history.entity';
import { HistoryRepository } from './history.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RoomHistoryDto } from './dto/room-history.dto';
import { ClientHistoryDto } from './dto/client-history.dto';

@Injectable()
export class HistoryService extends TypeOrmCrudService<History> {
  constructor(
    private readonly historyRepository: HistoryRepository,
  ) {super(historyRepository);}

  async getHistoryRoom(room: RoomHistoryDto) {
    return await this.historyRepository.getHistoryRoom(room);
  }

  async getHistoryClient(client: ClientHistoryDto) {
    return await this.historyRepository.getHistoryClient(client);
  }
}