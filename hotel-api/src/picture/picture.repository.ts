import { Room } from 'src/room/room.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {

    async getPicturesRoom(room: Room): Promise<Picture[]> {
        const picturesFind = await this.find({ where: { room: room} });
        return picturesFind;
      } 

}