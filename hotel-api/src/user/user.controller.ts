import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInterceptor } from './interceptor/create-user.interceptor';
import { UserService } from './user.service';
import { catchError, map, of } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { hasRoles } from 'src/userRol/decorators/roles.decorator';
import { UserRole } from './user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/userRol/guards/roles.guard';

@Crud({
  model: { type: User },
  dto: { create: CreateUserDto },
  query: {
    alwaysPaginate: true
  },
  routes: {
    only: ['getManyBase', 'createOneBase', 'getOneBase'],
  },
})
  
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
  
  @Override('getManyBase')
  @Get()
  findAllUsers() {
    return this.service.findAllUsers();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Override('createOneBase')
  @UseInterceptors(CreateUserInterceptor)
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return (await this.service.createUser(user)).pipe(
      map((user: User) => user),
      catchError(err => of({ error: err.message }))
  );
  }

  @Override('getOneBase')
  @Get(':id')
  findOneUser(@Param('id') id: number) {
    return this.service.findOneUser(id);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    const userLogin = await this.service.login(user)
    if (userLogin !== 'Wrong Credentials')
    {return userLogin }
    else {return 'Wrong Credentials'}
  }

  }