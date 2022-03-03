import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
  } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty } from 'class-validator';
import { Room } from 'src/room/room.entity';
import { History } from '../history/history.entity';

@Entity()
export class Client extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @MaxLength(20, { always: true })
  @IsNotEmpty({ message: 'The name is required' })
  @Column({ type: "varchar", length: 20, nullable: false})
  name: string;

  @ApiProperty()
  @MaxLength(20, { always: true })
  @IsNotEmpty({ message: 'The last name is required' })
  @Column({ type: "varchar", length: 20, nullable: false })
  lastName: string;

  @ApiProperty()
  @MaxLength(8, { always: true })
  @IsNotEmpty({ message: 'The document is required' })
  @Column({ type: "int", nullable: false, unique: true })
  document: number;
  
  @OneToMany(() => Room, (room) => room.client)
    room: Room[];

  @OneToMany(() => History, (history) => history.client)
    history: History[];

}
