import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Exclude } from "class-transformer";
import {
    Column,
    Entity,
    OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { RolesEnum } from "../enum";
import { User } from "./user.entity";

@Entity("roles")
export class Role {
    @Exclude()
    @ApiProperty()
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @ApiProperty()
    @Column({ type: "enum", enum: RolesEnum, default: RolesEnum.USER })
    name: RolesEnum;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
