import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "providers/auth.middleware";
import controllers from "./controllers";
import entities from "./entities";
import interceptor from "./interceptor";
import * as ormConfig from "./ormconfig";
import providers from "./providers";

console.log("config", { ...ormConfig, password: "***" });

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        TypeOrmModule.forFeature(entities),
        JwtModule.register({
            secret: "secret",
            signOptions: { expiresIn: "1d" },
        }),
        PassportModule.register({ defaultStrategy: "jwt" }),
    ],
    controllers: controllers,
    providers: [...providers,...interceptor],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes("*");
    }
}
