import { Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService extends TypeOrmCrudService<Client> {
  constructor(private readonly clientRepository: ClientRepository) {
    super(clientRepository);
  }

  async getClientByDocument(document: number) {
    return await this.clientRepository.getClientByDocument(document);
  }
}
