import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "entities";
import { Response } from "express";
import { ICrudRequest } from "nest-utils";
import { LoginDTO, RegisterDto } from "../dto";
import { AuthService } from "../providers";

@ApiTags("Auth")
@Controller("/auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post("login")
    async login(
        @Body() loginDto: LoginDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        return this._authService.login(loginDto, res);
    }

    @Post("register")
    async register(@Body() regDto: RegisterDto) {
        return this._authService.register(regDto);
    }

   
}
