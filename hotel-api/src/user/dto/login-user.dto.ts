import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The username is required' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}