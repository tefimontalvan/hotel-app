import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super(userRepository);
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.createUser(user);
  }

  async findOneUser(id: number) {
    return await this.userRepository.findOneUser(id);
  }

  async findAllUsers() {
    return await this.userRepository.findAllUsers();
  }

  async login(user: LoginUserDto): Promise<any> {
    const userFind = await this.authService.validateUser(
      user.username,
      user.password,
    );
    let acces_token;
    if (userFind !== null) {
      const payload = {
        username: userFind.username,
        role: userFind.role,
      };
      return {
        acces_token: this.authService.generateJWT(payload),
        username: user.username,
      };
    } else {
      return 'Wrong Credentials';
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Observable<any>> {
    return from(
      this.findOne(
        { username },
        { select: ['id', 'password', 'name', 'username', 'email', 'role'] },
      ),
    ).pipe(
      switchMap(async (user: User) =>
        (await this.authService.comparePasswords(password, user.password)).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }
}
