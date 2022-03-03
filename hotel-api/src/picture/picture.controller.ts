import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePictureDto } from './dto/create-picture.dto';
import { PictureService } from './picture.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Picture } from './picture.entity';
import { Room } from 'src/room/room.entity';
import { hasRoles } from 'src/userRol/decorators/roles.decorator';
import { UserRole } from 'src/user/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@Crud({
  model: { type: Picture },
  dto: { create: CreatePictureDto },
  query: {
    alwaysPaginate: true,
    join: {
      room: {
        eager: true,
      },
    },
  },
  routes: {
    only: ['getManyBase', 'createOneBase', 'deleteOneBase'],
    createOneBase: {
      decorators: [hasRoles(UserRole.ADMIN), UseGuards(JwtAuthGuard)],
    },
    deleteOneBase: {
      decorators: [hasRoles(UserRole.ADMIN), UseGuards(JwtAuthGuard)],
    },
  },
})
@ApiTags('Picture')
@Controller('picture')
export class PictureController implements CrudController<Picture> {
  constructor(public service: PictureService) {}

  @Override('getManyBase')
  @Get()
  getPicturesRoom(@Body() room: Room) {
    return this.service.getPicturesRoom(room);
  }
}
