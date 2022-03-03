import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../client.entity';
  
  async function createValidation(value: CreateClientDto) {
    const exists = await Client.findOne({ where: { document: value.document} });
    if (exists) {
      throw new BadRequestException('this client already exists');
    }
  }
  
  @Injectable()
  export class CreateClientInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      await createValidation(request.body);
      return next.handle().pipe();
    }
  }