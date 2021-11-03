import './crud-options';
import * as cookieParser from 'cookie-parser';
import { bootstrap } from '@avidi/core';
import { AppModule } from './app.module';

bootstrap(AppModule, app => {
    app.use(cookieParser());
});