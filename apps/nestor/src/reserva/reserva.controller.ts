/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CriaReservaDTO } from './dto/criaReservaDTO';
import { atualizaReservaDTO } from './dto/atualizaReservaDTO';

@Controller()
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}
  @MessagePattern({ cmd: 'get-reservas-usuario'})
  async listarUsuarios(@Ctx() contexto: RmqContext, @Payload() idUsuario: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.listarReservasDoUsuario(idUsuario)
  }
  @MessagePattern({ cmd: 'get-reserva-usuario'})
  async listarUsuario(@Ctx() contexto: RmqContext, @Payload() payload: {idUsuario: string; idReserva: string}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.listarReservaDoUsuario(payload.idUsuario, payload.idReserva)
  }
  @MessagePattern({ cmd: 'post-pagamento-realizado'})
  async pagamentoConfirma(@Ctx() contexto: RmqContext, @Payload() payload: {idUsuario: string; idPagamento: string; idReserva: string}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.confirmarPagamento(payload.idUsuario,payload.idPagamento, payload.idReserva)
  }
  
  @MessagePattern({ cmd: 'post-reserva-usuario'})
  async enviarUsuario(@Ctx() contexto: RmqContext, @Payload() payload: {idUsuario: string; idQuarto: string; dados: CriaReservaDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.criaReservaQuarto(payload.idUsuario, payload.idQuarto, payload.dados)
  }
  @MessagePattern({ cmd: 'post-reembolso'})
  async criandoReembolso(@Ctx() contexto: RmqContext, @Payload() payload: {idUsuario: string; idPagamento: string; }){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.fazerReembolso(payload.idUsuario, payload.idPagamento)
  }
  @MessagePattern({ cmd: 'post-detalheQuarto'})
  async detalhandoReserva(@Ctx() contexto: RmqContext, @Payload() payload: {idHotel: string; idReserva: string; }){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.detalhar(payload.idHotel, payload.idReserva)
  }
  @MessagePattern({ cmd: 'patch-reserva-usuario'})
  async atualizarUsuario(@Ctx() contexto: RmqContext, @Payload() payload: { idUsuario: string; idQuarto: string; idReserva: string; dados: atualizaReservaDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.atualizarReserva(payload.idUsuario, payload.idQuarto, payload.idReserva, payload.dados)
  }
  @MessagePattern({ cmd: 'del-reserva-usuario'})
  async deletarUsuario(@Ctx() contexto: RmqContext, @Payload() payload: { idUsuario: string; idQuarto: string; idReserva: string;}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.reservaService.deletarReserva(payload.idUsuario, payload.idQuarto, payload.idReserva)
  }
  
}
