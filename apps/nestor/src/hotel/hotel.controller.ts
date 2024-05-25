/* eslint-disable prettier/prettier */

import { HotelService } from './hotel.service';

import { criaHotelDTO } from './dto/criaHotelDTO';
import { atualizaHotelDTO } from './dto/atualizaHotelDTO';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';


@Controller()
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  @MessagePattern({ cmd: 'get-hoteis'})
  async listarHoteis(@Ctx() contexto: RmqContext){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.hotelService.listarHoteis()
  }
  @MessagePattern({ cmd: 'get-hotel'})
  async listarHotel(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.hotelService.listarHotel(id)
  }
  @MessagePattern({ cmd: 'post-hotel'})
  async enviarUsuario(@Ctx() contexto: RmqContext, @Payload() dados: criaHotelDTO){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.hotelService.criarHotel(dados)
  }
  @MessagePattern({ cmd: 'patch-hotel'})
  async atualizarUsuario(@Ctx() contexto: RmqContext, @Payload() payload: { id: string; dados: atualizaHotelDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.hotelService.atualizarHotel(payload.id, payload.dados)
  }
  @MessagePattern({ cmd: 'del-hotel'})
  async deletarUsuario(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.hotelService.deleraHotel(id)
  }
  
}
