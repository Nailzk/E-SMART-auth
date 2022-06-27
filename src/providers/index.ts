import { AuthService } from "./auth.service";
import { RolesService } from "./roles.service";
import { UsersService } from "./users.service";

export {
    UsersService,
    AuthService,
    RolesService,
};

export default [
    UsersService,
    AuthService,
    RolesService,
]