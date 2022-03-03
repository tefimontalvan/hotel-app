import {
  Controller,
  Put,
  UseInterceptors,
  Param,
  UseGuards,
  Patch,
  Body,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomInterceptor } from './interceptor/create-room.interceptor';
import { HistoryInterceptor } from './interceptor/history.interceptor';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { RoomDto } from './dto/room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { hasRoles } from 'src/userRol/decorators/roles.decorator';
import { UserRole } from 'src/user/user.interface';
import { RolesGuard } from 'src/userRol/guards/roles.guard';

@Crud({
  model: { type: Room },
  dto: { create: RoomDto, update: UpdateRoomDto },
  query: {
    alwaysPaginate: true,
    join: {
      client: {
        eager: true,
      },
      pictures: {
        eager: true,
      },
      services: {
        eager: true,
      },
    },
  },
  routes: {
    only: ['getManyBase', 'createOneBase', 'getOneBase', 'updateOneBase'],
    createOneBase: {
      interceptors: [CreateRoomInterceptor],
      decorators: [hasRoles(UserRole.ADMIN), UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
      decorators: [hasRoles(UserRole.ADMIN), UseGuards(JwtAuthGuard)],
    },
  },
})
@ApiTags('Room')
@Controller('room')
export class RoomController implements CrudController<Room> {
  constructor(public service: RoomService) {}

  @Override('getManyBase')
  @Get()
  getRooms() {
    return this.service.getRooms();
  }

  @Put(':id')
  @UseInterceptors(HistoryInterceptor)
  emptyRoom(@Param('id') id: number) {
    return this.service.emptyRoom(id);
  }

  @Patch('upload/client/:id')
  uploadClient(@Param('id') id: number, @Body() client: any) {
    return this.service.uploadClient(id, client);
  }

  @Patch('/delete/client/:id')
  deletClient(@Param('id') id: number) {
    return this.service.deleteClient(id);
  }
}
