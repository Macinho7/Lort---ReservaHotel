/* eslint-disable prettier/prettier */

import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntidade } from "../Entidades/usuario.entity";
import { HotelEntidade } from "../Entidades/hotel.entity";
import { ReservaEntidade } from "../Entidades/reserva.entity";
import { PagamentoEntidade } from "../Entidades/pagamento.entity";
import { QuartoEntidade } from "../Entidades/quarto.entity";
import { AvaliacaoEntidade } from "../Entidades/avaliacao.entity";
import { ServicoEspecialEntidade } from "../Entidades/servico-especial.entity";
import { AcharMetodos } from "./acharMetodos";
import { HotelModule } from "../hotel/hotel.module";
import { QuartoModule } from "../quarto/quarto.module";
import { ReservaModule } from "../reserva/reserva.module";
import { AvaliacaoModule } from "../avaliacao/avaliacao.module";
import { PagamentoModule } from "../pagamento/pagamento.module";
import { ServicoEspecialModule } from "../servico-especial/servico-especial.module";
import { LibModule, rmqModule } from "@app/livraria";
import { NestorModule } from "../nestor.module";

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
        forwardRef(() => NestorModule),
        forwardRef(() => HotelModule),
        forwardRef(() => QuartoModule),
        forwardRef(() => ReservaModule),
        forwardRef(() => AvaliacaoModule),
        forwardRef(() => PagamentoModule),
        forwardRef(() => ServicoEspecialModule),
        forwardRef(() => QuartoModule),
        forwardRef(() => AcharMetodoModule),
        
        rmqModule,
        LibModule,
      ],
      controllers: [],
      providers: [ AcharMetodos],
      exports: [AcharMetodos]
})
export class AcharMetodoModule {}
