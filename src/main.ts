import "./crud-options";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { bootstrap } from "nest-utils";
import { UserRequestInterceptor } from "./interceptor";

dotenv.config();

bootstrap(AppModule,(app) => {
    app.useGlobalInterceptors(new UserRequestInterceptor())
});
