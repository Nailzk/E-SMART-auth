import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Exclude } from "class-transformer";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("users")
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @ApiProperty()
    @Column({ type: "varchar", nullable: false, length: 155, unique: true })
    userName: string;

    @ApiProperty()
    @Column({ type: "varchar", nullable: false, length: 155, unique: true })
    email: string;

    @ApiProperty()
    @Exclude()
    @Column({ type: "varchar", nullable: false, length: 155 })
    password: string;

    @ApiProperty()
    @Column({ type: "integer", nullable: false })
    roleId: number;

    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn()
    role: Role;
}
