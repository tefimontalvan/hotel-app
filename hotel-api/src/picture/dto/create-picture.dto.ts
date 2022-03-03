import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Room } from 'src/room/room.entity';

export class CreatePictureDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The name is required' })
  url: string;

  @ApiProperty()
  room: Room;
}
