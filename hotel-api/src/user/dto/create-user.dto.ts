import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { REGEX } from 'src/app.utils';
import { UserRole } from '../user.interface';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The username is required' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The password is required' })
  @Length(8, 64)
  @Matches(REGEX.PASSWORD_RULE, { message: REGEX.PASSWORD_MESSAGE })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The role is required' })
  role: UserRole;
}
