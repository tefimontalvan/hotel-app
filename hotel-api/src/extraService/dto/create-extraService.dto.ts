import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Room } from 'src/room/room.entity';

export class CreateExtraServiceDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @ApiProperty()
  room: Room;
}
