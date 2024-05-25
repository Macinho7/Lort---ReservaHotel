/* eslint-disable prettier/prettier */

import { QuartoService } from './quarto.service';

import { criaQuartoDTO } from './dto/criaQuartoDTO';
import { atualizarQuartoDTO } from './dto/atualizaQuartoDTO';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';


@Controller()
export class QuartoController {
  constructor(private readonly quartoService: QuartoService) {}
  @MessagePattern({ cmd: 'get-quarto-hotel'})
  async listarQuartoHotel(@Ctx() contexto: RmqContext, @Payload() payload: { idHotel: string; idQuarto: string }){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.quartoService.listarUmQuartoDoHotel(payload.idHotel, payload.idQuarto)
  }
  @MessagePattern({ cmd: 'get-quartos-hotel'})
  async listarQuartosHotel(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.quartoService.listarQuartosDoHotel(id)
  }
  @MessagePattern({ cmd: 'get-quartos-disponiveis-hotel'})
  async listarQuartosDisponiveisHotel(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.quartoService.HotelQuartoDisponiveis(id)
  }
  @MessagePattern({ cmd: 'post-quarto-hotel'})
  async enviarQuartoHotel(@Ctx() contexto: RmqContext, @Payload() payload: {idHotel: string, dados: criaQuartoDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.quartoService.criaQuartoHotel(payload.idHotel, payload.dados)
  }
  @MessagePattern({ cmd: 'patch-quarto-hotel'})
  async atualizarQuartoHotel(@Ctx() contexto: RmqContext, @Payload() payload: { idHotel: string; idQuarto: string; dados: atualizarQuartoDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.quartoService.atualizaQuarto(payload.idHotel, payload.idQuarto, payload.dados)
  }
  @MessagePattern({ cmd: 'del-quarto-hotel'})
  async deletarQuarto(@Ctx() contexto: RmqContext, @Payload() payload: {idHotel: string, idQuarto: string}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.quartoService.deletarQuartoDoHotel(payload.idHotel, payload.idQuarto)
  }
  
}
