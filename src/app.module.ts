import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import * as express from 'express';
import { AuthModule } from './auth/auth.module';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    CertificatesModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
    }),
    UsersModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(join(__dirname, '..', 'public')))
      .forRoutes('*');

    consumer
      .apply(CookieParserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply cookie parser middleware to all routes
  }
}
