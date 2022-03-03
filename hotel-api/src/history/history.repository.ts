import { EntityRepository, Repository } from 'typeorm';
import { ClientHistoryDto } from './dto/client-history.dto';
import { RoomHistoryDto } from './dto/room-history.dto';
import { History } from './history.entity';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {

  async getHistoryRoom(room: RoomHistoryDto): Promise<History[]> {
    return await this.find({where: { room: room}  });
  }

async getHistoryClient(client: ClientHistoryDto): Promise<History[]> {
    return await this.find({where: { client: client}  });
  }
}