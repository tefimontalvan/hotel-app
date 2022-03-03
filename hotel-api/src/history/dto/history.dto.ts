import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/client/client.entity';
import { Room } from 'src/room/room.entity';

export class HistoryDto {
  @ApiProperty()
  room: Room;

  @ApiProperty()
  client: Client | null;

  @ApiProperty()
  checkIn_at: Date

  @ApiProperty()
  checkOut_at: Date
}