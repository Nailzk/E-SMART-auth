import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty()
    userName:string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    surName: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    password: string;
}