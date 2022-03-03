import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExtraServiceDto } from './dto/create-extraService.dto';
import { ExtraServiceService } from './extraService.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ExtraService } from './extraService.entity';
import { Room } from 'src/room/room.entity';
import { hasRoles } from 'src/userRol/decorators/roles.decorator';
import { UserRole } from 'src/user/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@Crud({
  model: { type: ExtraService },
  dto: { create: CreateExtraServiceDto },
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
@ApiTags('ExtraService')
@Controller('extraService')
export class ExtraServiceController implements CrudController<ExtraService> {
  constructor(public service: ExtraServiceService) {}

  @Override('getManyBase')
  @Get()
  getServicesRoom(@Body() room: Room) {
    return this.service.getServicesRoom(room);
  }
}
