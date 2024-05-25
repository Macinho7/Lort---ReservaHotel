/* eslint-disable prettier/prettier */
;
import { NestorController } from './nestor.controller';
import { NestorService } from './nestor.service';
import { HotelModule } from './hotel/hotel.module';
import { QuartoModule } from './quarto/quarto.module';
import { ReservaModule } from './reserva/reserva.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { ServicoEspecialModule } from './servico-especial/servico-especial.module';

import { UsuarioEntidade } from './Entidades/usuario.entity';
import { ServicoEspecialEntidade } from './Entidades/servico-especial.entity';
import { AvaliacaoEntidade } from './Entidades/avaliacao.entity';
import { QuartoEntidade } from './Entidades/quarto.entity';
import { PagamentoEntidade } from './Entidades/pagamento.entity';
import { ReservaEntidade } from './Entidades/reserva.entity';
import { HotelEntidade } from './Entidades/hotel.entity';
import { LibModule, rmqModule } from '@app/livraria';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcharMetodos } from './metodosDeProcura/acharMetodos';
import { AcharMetodoModule } from './metodosDeProcura/acharMetodos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioEntidade,
      HotelEntidade,
      ReservaEntidade,
      PagamentoEntidade,
      QuartoEntidade,
      AvaliacaoEntidade,
      ServicoEspecialEntidade,
      AcharMetodos
    ]),
    forwardRef(() => HotelModule),
    forwardRef(() => QuartoModule),
    forwardRef(() => ReservaModule),
    forwardRef(() => AvaliacaoModule),
    forwardRef(() => PagamentoModule),
    forwardRef(() => ServicoEspecialModule),
    forwardRef(() => AcharMetodoModule),
    rmqModule,
    LibModule,
  ],
  controllers: [NestorController],
  providers: [NestorService, UsuarioEntidade, AcharMetodos],
  exports: [UsuarioEntidade]
})
export class NestorModule {}
