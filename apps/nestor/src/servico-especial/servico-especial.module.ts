/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { ServicoEspecialService } from './servico-especial.service';
import { ServicoEspecialController } from './servico-especial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { PagamentoModule } from '../pagamento/pagamento.module';
import { AvaliacaoModule } from '../avaliacao/avaliacao.module';
import { ReservaModule } from '../reserva/reserva.module';
import { QuartoModule } from '../quarto/quarto.module';
import { HotelModule } from '../hotel/hotel.module';
import { ServicoEspecialEntidade } from '../Entidades/servico-especial.entity';
import { AvaliacaoEntidade } from '../Entidades/avaliacao.entity';
import { QuartoEntidade } from '../Entidades/quarto.entity';
import { PagamentoEntidade } from '../Entidades/pagamento.entity';
import { ReservaEntidade } from '../Entidades/reserva.entity';
import { LibModule, rmqModule } from '@app/livraria';
import { AcharMetodoModule } from '../metodosDeProcura/acharMetodos.module';
import { AcharMetodos } from '../metodosDeProcura/acharMetodos';

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
  controllers: [ServicoEspecialController],
  providers: [ServicoEspecialService],
})
export class ServicoEspecialModule {}
