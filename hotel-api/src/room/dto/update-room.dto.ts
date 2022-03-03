import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/client/client.entity';
import { RoomType } from '../roomType.enum';

export class UpdateRoomDto {
  @ApiProperty()
  roomNumber: string;

  @ApiProperty()
  empty: boolean;

  @ApiProperty()
  type: RoomType;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  client: Client;
}