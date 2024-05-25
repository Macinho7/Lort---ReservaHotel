/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestorModule } from './nestor.module';
import { LibService } from '@app/livraria';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(NestorModule)

  const libsService = app.get(LibService)
  const configService = app.get(ConfigService)

  const queue =  configService.get('RABBITMQ_AUTH_QUEUE')
  app.connectMicroservice(libsService.moduloRmq(queue))
  app.startAllMicroservices()
}
bootstrap();

