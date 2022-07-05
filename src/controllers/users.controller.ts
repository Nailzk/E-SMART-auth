import { Controller, Get, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ICrudRequest } from "nest-utils";
import { User } from "../entities";
import { UsersService } from "../providers";

@Crud({
    model: {
        type: User,
    },
    params: {
        id: {
            field: "id",
            type: "number",
            primary: true,
        },
    },
    query: {
        join: {
            role: { eager: false },
        },
    },
    routes: {
        only: ["getOneBase", "getManyBase"],
    },
})
@ApiTags("Users")
@Controller("users")
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}

    @Get("me")
    public async getUser(@Req() request: ICrudRequest): Promise<User> {
        return this.service.getUser(request);
    }
}
