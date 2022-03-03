import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/user.entity';
import { getRepository } from 'typeorm';
const argon2 = require('argon2');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
   
    generateJWT(user: any): string {
        /* const passwordHash = this.hashPassword(user.password)
        const userHash = { ...user, password: passwordHash }; */
        return this.jwtService.sign(user)
    }

    hashPassword(password:string): Observable <string> {
        const argon2id = argon2.hash(password, 2, 15728.6, 1 )
        /* argon2id.DegreeOfParallelism = 1;
        argon2id.Iterations = 2;
        argon2id.MemorySize = 15728.6; */
        return argon2id
    }

    async comparePasswords(newPassword: string, passwordHash: string | Observable<string>): Promise<Observable<any>> {
        return of<any | boolean>(await argon2.verify(passwordHash, newPassword))
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await User.createQueryBuilder('user')
          .select(["user.password",'user.id', 'user.name', 'user.username', 'user.email', 'user.role'])
          .where('user.username = :username', { username: username })
          .getOne();
        
        if (user !== undefined)
        {const match = await argon2.verify(user.password, password);
        if (match) {
          const { password, ...result } = user;
          return result;
        }
        return null;}
        else {return null;}
      }

}
