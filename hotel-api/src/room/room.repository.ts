import { EntityRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async emptyRoom(id: number): Promise<any> {
    const roomFind = await this.findOne(id);
    const roomUpdated = { ...roomFind, empty: !roomFind.empty };
    await this.update(id, roomUpdated);
    return roomUpdated;
  }

  async uploadClient(id: number, client: any): Promise<Room> {
    const roomFind = await this.findOne(id);
    const clientUpdated = { ...roomFind, client: client };
    await this.update(id, clientUpdated);
    return roomFind;
  }

  async getRooms(): Promise<Room[]> {
    return await Room.createQueryBuilder('room')
      .leftJoinAndSelect('room.pictures', 'room_pictures')
      .leftJoinAndSelect('room.services', 'room_services')
      .leftJoinAndSelect('room.client', 'room_client')
      .where('room.active = true')
      .getMany();
  }

  async deleteClient(id: number): Promise<Room> {
    const clientFind = await this.findOne(id);
    const clientUpdated = { ...clientFind, client: null };
    await this.update(id, clientUpdated);

    return clientFind;
  }
}
