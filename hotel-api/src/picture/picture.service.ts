import { Injectable } from '@nestjs/common';
import { Picture } from './picture.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PictureRepository } from './picture.repository';
import { Room } from 'src/room/room.entity';

@Injectable()
export class PictureService extends TypeOrmCrudService<Picture>{
  constructor(
    private readonly pictureRepository: PictureRepository
  ) {super(pictureRepository);}

  async getPicturesRoom(room: Room) {
    return await this.pictureRepository.getPicturesRoom(room);
  } 
}