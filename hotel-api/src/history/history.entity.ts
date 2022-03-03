import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Room } from 'src/room/room.entity';
import { Client } from 'src/client/client.entity';
  
  @Entity()
  export class History extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Client, (client) => client.id)
    client: Client;
  
    @ManyToOne((type) => Room, (room) => room.id)
    room: Room;
  
    @Column({nullable:false})
    checkIn_at: Date;
  
    @Column({nullable:false})
    checkOut_at: Date;
  }