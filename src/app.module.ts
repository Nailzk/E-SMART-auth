import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import interceptor from "interceptor";
import controllers from "./controllers";
import entities from "./entities";
import * as ormConfig from "./ormconfig";
import providers from "./providers";

console.log("config", { ...ormConfig, password: "***" });

const env = process.env;

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        TypeOrmModule.forFeature(entities),
        JwtModule.register({ secret: env.JWT_SECRET_KEY }),
    ],
    controllers: controllers,
    providers: [...providers, ...interceptor],
})
export class AppModule {}
