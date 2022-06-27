import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty()
    userName:string;

    @ApiProperty()
    password: string;
}