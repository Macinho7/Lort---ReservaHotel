/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config';
import { LibService } from './livraria.service';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>({
        type: 'postgres',
        url: configService.get('POSTGRES_URI'),
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.js, .ts}']
        //synchronize: true . evitar durante perda de dados
      }), 
      inject: [
        ConfigService
      ]
    })
  ],
  providers: [LibService],
  exports: [LibService],
})
export class LibModule {}