import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { AllExceptionsFilter } from './all-exceptions.filter';
import * as session from 'express-session';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.use(
    session({
      secret: 'my-secret2',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'views'), {
    prefix: '/views/',
  });
  app.setBaseViewsDir(resolve(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
