import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Room } from '../room/room.entity';
  
  @Entity('extraService')
  export class ExtraService extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar'})
    name: string;

    @ManyToOne((type) => Room, (room) => room.id, { nullable: false })
    room: Room[];
  }