import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Room} from '../room.entity';
  
  async function createValidation(value: Room) {
    const exists = await Room.findOne({ where: { roomNumber: value.roomNumber } });
    if (exists) {
      throw new BadRequestException('This room already exists');
    }
  }
  
  @Injectable()
  export class CreateRoomInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      await createValidation(request.body);
      return next.handle().pipe();
    }
  }