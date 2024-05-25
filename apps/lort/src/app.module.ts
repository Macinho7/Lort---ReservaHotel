/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { rmqModule } from '@app/livraria';
import { AppService } from './app.service';
import {TerminusModule} from '@nestjs/terminus'
import { RateLimiterModule } from 'nestjs-rate-limiter';
@Module({
  imports: [TerminusModule,rmqModule.registrarRmq('Nestor_Service', process.env.RABBITMQ_AUTH_QUEUE), RateLimiterModule],
  controllers: [AppController],
  providers:  [AppService],
})
export class AppModule {}
