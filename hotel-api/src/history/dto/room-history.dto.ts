import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from 'src/room/roomType.enum';

export class RoomHistoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roomNumber: string;

  @ApiProperty()
  type: RoomType

  @ApiProperty()
  capacity: number

  @ApiProperty()
  empty: boolean

  @ApiProperty()
  active: boolean
}