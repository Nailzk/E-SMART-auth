import { AuthController } from "./auth.controller";
import { RolesController } from "./roles.controller";
import { UsersController } from "./users.controller";

export {
    UsersController,
    AuthController,
    RolesController,
};

export default [
    UsersController,
    AuthController,
    RolesController,
]