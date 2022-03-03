import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getClientByDocument(document: number): Promise<Client> {
    const clientFind = await this.findOne({ where: { document: document } });
    return clientFind;
  }
}
