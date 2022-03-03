import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { History } from './history.entity';
import { HistoryService } from './history.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { HistoryDto } from './dto/history.dto';
import { RoomHistoryDto } from './dto/room-history.dto';
import { ClientHistoryDto } from './dto/client-history.dto';
import { hasRoles } from 'src/userRol/decorators/roles.decorator';
import { UserRole } from 'src/user/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/userRol/guards/roles.guard';

@Crud({
  model: { type: History },
  dto: { create: HistoryDto },
  query: {
    alwaysPaginate: true,
    join: {
      client: {
        eager: true,
      },
      room: {
        eager: true,
      },
    },
  },
  routes: {
    only: ['getManyBase', 'createOneBase'],
  },
})
@ApiTags('History')
@Controller('history')
export class HistoryController implements CrudController<History> {
  constructor(public service: HistoryService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post('room')
  getHistoryRoom(@Body() room: RoomHistoryDto) {
    return this.service.getHistoryRoom(room);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post('client')
  getHistoryClient(@Body() client: ClientHistoryDto) {
    return this.service.getHistoryClient(client);
  }
}
