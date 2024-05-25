/* eslint-disable prettier/prettier */
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { PagamentoModule } from '../pagamento/pagamento.module';
import { AvaliacaoModule } from '../avaliacao/avaliacao.module';
import { ReservaModule } from '../reserva/reserva.module';
import { ServicoEspecialEntidade } from '../Entidades/servico-especial.entity';
import { AvaliacaoEntidade } from '../Entidades/avaliacao.entity';
import { QuartoEntidade } from '../Entidades/quarto.entity';
import { PagamentoEntidade } from '../Entidades/pagamento.entity';
import { ReservaEntidade } from '../Entidades/reserva.entity';
import { ServicoEspecialModule } from '../servico-especial/servico-especial.module';
import { QuartoModule } from '../quarto/quarto.module';
import { LibModule, rmqModule } from '@app/livraria';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AcharMetodos } from '../metodosDeProcura/acharMetodos';
import { AcharMetodoModule } from '../metodosDeProcura/acharMetodos.module';

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
  controllers: [HotelController],
  providers: [HotelService, AcharMetodos],
})
export class HotelModule {}
