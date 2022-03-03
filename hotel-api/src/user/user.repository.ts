import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { catchError, from, map, Observable, switchMap, throwError} from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
const argon2 = require('argon2');

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async hashPassword(password:string): Promise<Observable<string>> {
      const argon2id = argon2.hash(password, 2, 15728.6, 1 )
      return argon2id
  }

    async createUser(user: CreateUserDto) {
        const passwordHash = await this.hashPassword(user.password)
       
        const newUser = new User();
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash.toString();
        newUser.role = user.role;
    
        return from(this.save(newUser)).pipe(
          map((user: User) => {
          const {password, ...result} = user;
            return result;
              }),
              catchError(err => throwError(err))
              )
          }
      
    
      async findOneUser(id: number): Promise<Observable<any>> {
        return from(this.findOne({id})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            } )
        )
      }
    
      async findAllUsers(): Promise<Observable<User[]>> {
        return from(this.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );
      }
}