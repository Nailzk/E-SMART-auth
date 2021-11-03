import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'
import { AuthMiddleware } from 'providers/auth.middleware';
import controllers from './controllers';
import entities from './entities';
import * as ormConfig from './ormconfig';
import providers from './providers';


console.log('config', { ...ormConfig, password: '***' })

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature(entities),
    JwtModule.register({ secret: 'secret' })
  ],
  controllers: controllers,
  providers: providers,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
