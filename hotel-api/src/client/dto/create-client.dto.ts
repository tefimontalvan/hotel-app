import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The last name is required' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The document is required' })
  document: number;
}
