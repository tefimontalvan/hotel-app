import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService extends TypeOrmCrudService<Room> {
  constructor(private readonly roomRepository: RoomRepository) {
    super(roomRepository);
  }
  async emptyRoom(id: number) {
    return await this.roomRepository.emptyRoom(id);
  }

  async uploadClient(id: number, client: any) {
    return await this.roomRepository.uploadClient(id, client);
  }

  async getRooms() {
    return await this.roomRepository.getRooms();
  }

  async deleteClient(id: number) {
    return await this.roomRepository.deleteClient(id);
  }
}
