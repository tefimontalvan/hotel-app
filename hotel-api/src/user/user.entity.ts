import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from "./user.interface";
import { IsNotEmpty } from 'class-validator'

@Entity()
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'The name is required' })
    @Column()
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The username is required' })
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The email is required' })
    @Column({unique: true})
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The password is required' })
    @Column({select: false})
    password: string

    @ApiProperty()
    @Column({type: 'enum', enum: UserRole})
    role: UserRole;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}