import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
  
  async function createValidation(value: CreateUserDto) {
    const exists = await User.findOne({ where: { username: value.username} });
    if (exists) {
      throw new BadRequestException('this username already exists');
    }
  }
  
  @Injectable()
  export class CreateUserInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      await createValidation(request.body);
      return next.handle().pipe();
    }
  }