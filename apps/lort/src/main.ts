/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(helmet())
  app.use(compression({threshold: 5000}));


  await app.listen(5000);
}
bootstrap();
