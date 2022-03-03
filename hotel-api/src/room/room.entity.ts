import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Client } from 'src/client/client.entity';
  import { RoomType } from './roomType.enum';
  import { ExtraService } from '../extraService/extraService.entity';
  import { Picture } from '../picture/picture.entity';
import { History } from '../history/history.entity';
  
  @Entity('room')
  export class Room extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    roomNumber: string;
  
    @ManyToOne((type) => Client, (client) => client.id)
    client: Client;
  
    @Column({ type: 'boolean', default: true })
    empty: boolean;
  
    @Column({ nullable: false })
    type: RoomType;

    @OneToMany(() => Picture, (picture) => picture.room)
    pictures: Picture[];

    @OneToMany(() => ExtraService, (extraService) => extraService.room)
    services: ExtraService[];

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @OneToMany(() => History, (history) => history.room)
    history: History[];
  }
  