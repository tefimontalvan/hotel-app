import { ApiProperty } from '@nestjs/swagger';

export class ClientHistoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string

  @ApiProperty()
  document: number
}