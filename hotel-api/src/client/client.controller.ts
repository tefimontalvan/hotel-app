import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientInterceptor } from './interceptor/create-client.interceptor';
import { ClientService } from './client.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Client } from './client.entity';

@Crud({
  model: { type: Client },
  dto: { create: CreateClientDto },
  query: {
    alwaysPaginate: true,
    join: {
      room: {
        eager: true,
      },
    },
  },
  routes: {
    only: ['getManyBase', 'createOneBase', 'getOneBase'],
    createOneBase: { interceptors: [CreateClientInterceptor] },
  },
})
@ApiTags('Client')
@Controller('client')
export class ClientController implements CrudController<Client> {
  constructor(public service: ClientService) {}

  @Get('/document/:document')
  getClientByDocument(@Param('document') document: number) {
    return this.service.getClientByDocument(document);
  }
}
