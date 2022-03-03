import { Room } from 'src/room/room.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ExtraService } from './extraService.entity';

@EntityRepository(ExtraService)
export class ExtraServiceRepository extends Repository<ExtraService> {

    async getServicesRoom(room: Room): Promise<ExtraService[]> {
        const servicesFind = await this.find({ where: { room: room} });
        return servicesFind;
      } 
      
}