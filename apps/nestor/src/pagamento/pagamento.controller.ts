/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';


@Controller()
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}
  @MessagePattern({ cmd: 'get-pagamentosUsuario'})
  async listarHotel(@Ctx() contexto: RmqContext, @Payload() idUsuario: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.pagamentoService.listarPagamentosUsuario(idUsuario)
  }
  @MessagePattern({ cmd: 'del-usuarioPagamento'})
  async enviarUsuario(@Ctx() contexto: RmqContext, @Payload() dados: {idUsuario: string, idPagamento: string}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.pagamentoService.deletarPagamento(dados.idUsuario, dados.idPagamento)
  }
  
}
