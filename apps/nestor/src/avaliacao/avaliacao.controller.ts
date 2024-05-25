/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { criaAvaliacaoDTO } from './dto/criaAvaliacao';
import { atualizaAvaliacao } from './dto/atualizaAvaliacao';


@Controller()
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @MessagePattern({ cmd: 'get-avaliacoesHotel'})
  async listarHotel(@Ctx() contexto: RmqContext, @Payload() idHotel: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.avaliacaoService.avaliacoesDoHotel(idHotel)
  }

  @MessagePattern({ cmd: 'post-avaliacaoHotel'})
  async enviarUsuario(@Ctx() contexto: RmqContext, @Payload() dados: { idUsuario: string; idHotel: string; dados: criaAvaliacaoDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.avaliacaoService.criaAvaliacaoParoHotel(dados.idUsuario, dados.idHotel, dados.dados)
  }
  @MessagePattern({ cmd: 'del-avaliacaoHotel'})
  async deletarAvaliacao(@Ctx() contexto: RmqContext, @Payload() dados: { idUsuario: string; idAvaliacao: string; idHotel: string}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.avaliacaoService.deletarAvaliacao(dados.idUsuario, dados.idAvaliacao,  dados.idHotel)
  }
  @MessagePattern({ cmd: 'patch-avaliacaoHotel'})
  async atualizarAvaliacao(@Ctx() contexto: RmqContext, @Payload() dados: { idUsuario: string; idAvaliacao: string; dados: atualizaAvaliacao}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.avaliacaoService.atualizarAvaliacao(dados.idUsuario, dados.idAvaliacao,  dados.dados)
  }
}
