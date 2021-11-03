import { CrudValidationGroups } from '@nestjsx/crud';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ContainsId } from '@avidi/core';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('users')
@ContainsId()
export class User {
  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsEmail({ require_tld: false }, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;
}
