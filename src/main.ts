import "./crud-options";
import { AppModule } from "app.module";
import * as dotenv from "dotenv";
import { bootstrap, CrudRequestInterceptor } from "nest-utils";

dotenv.config();

bootstrap(AppModule,(app) => {
    app.useGlobalInterceptors(new CrudRequestInterceptor())
});
