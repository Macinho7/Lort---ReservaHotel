/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';

import { ServicoEspecialService } from './servico-especial.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { criaServicoEspecial } from './dto/criaServico';
import { atualizaServico } from './dto/update-servico-especial.dto';


@Controller()
export class ServicoEspecialController {
  constructor(private readonly servicoEspecialService: ServicoEspecialService) {}

  @MessagePattern({ cmd: 'post-servicoEspecialQuarto'})
  async detalhandoReserva(@Ctx() contexto: RmqContext, @Payload() payload: {idHotel: string; idQuarto: string; dados: criaServicoEspecial}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.servicoEspecialService.criaServicoEspecialQuarto(payload.idHotel, payload.idQuarto, payload.dados)
  }

  @MessagePattern({ cmd: 'patch-servicoEspecialQuarto'})
  async atualizarServico(@Ctx() contexto: RmqContext, @Payload() payload: {idHotel: string; idServico: string; dados: atualizaServico}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.servicoEspecialService.atualizarServicoEspecial(payload.idHotel, payload.idServico, payload.dados)
  }

  @MessagePattern({ cmd: 'del-servicoEspecialQuarto'})
  async (@Ctx() contexto: RmqContext, @Payload() payload: {idHotel: string; idServico: string;}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.servicoEspecialService.deletarServico(payload.idHotel, payload.idServico)
  }
}
