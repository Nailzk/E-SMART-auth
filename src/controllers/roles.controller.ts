import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Role } from "../entities";
import { RolesService } from "../providers";

@Crud({
    model: {
        type: Role,
    },
    params: {
        id: {
            field: "id",
            type: "number",
            primary: true,
        },
    },
    routes: {
        only: ["getOneBase"],
    },
})
@ApiTags("Roles")
@Controller("/roles")
export class RolesController implements CrudController<Role> {
    constructor(public service: RolesService) {}
}
