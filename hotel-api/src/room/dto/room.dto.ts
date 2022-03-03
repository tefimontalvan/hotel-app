import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoomType } from '../roomType.enum';

export class RoomDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The room number is required' })
  roomNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The empty value is required' })
  empty: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'The type is required' })
  type: RoomType;

  @ApiProperty()
  @IsNotEmpty({ message: 'The capacity is required' })
  capacity: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'The active value is required' })
  active: boolean;
}