/* eslint-disable prettier/prettier */

import { NestorService } from './nestor.service';

import { CriaUsuario } from './Dto/UsuarioDTO';
import { atualizaUsuarioDTO } from './Dto/AtualizaUsuarioDTO';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class NestorController {
  constructor(private readonly nestorService: NestorService) {}

  @MessagePattern({ cmd: 'get-usuarios'})
  async listarUsuarios(@Ctx() contexto: RmqContext){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.nestorService.listarUsuarios()
  }
  @MessagePattern({ cmd: 'get-usuario'})
  async listarUsuario(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.nestorService.listarUsuario(id)
  }
  @MessagePattern({ cmd: 'post-usuario'})
  async enviarUsuario(@Ctx() contexto: RmqContext, @Payload() usuario: CriaUsuario){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.nestorService.criaUsuario(usuario)
  }
  @MessagePattern({ cmd: 'patch-usuario'})
  async atualizarUsuario(@Ctx() contexto: RmqContext, @Payload() payload: { idCriador: string; idUsuarioAtualizar: string; dados: atualizaUsuarioDTO}){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.nestorService.atualizaUsuario(payload.idCriador, payload.idUsuarioAtualizar, payload.dados)
  }
  @MessagePattern({ cmd: 'del-usuario'})
  async deletarUsuario(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)

    return this.nestorService.deletarUsuario(id)
  }

  @MessagePattern({ cmd: 'res-usuario'})
  async restorarUsuario(@Ctx() contexto: RmqContext, @Payload() id: string){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)
    

    return this.nestorService.restorarUsuario(id)
  }
  @MessagePattern({ cmd: 'aoc-usuarios'})
  async listarDeletados(@Ctx() contexto: RmqContext){
    const channel = contexto.getChannelRef()
    const message = contexto.getMessage()
    channel.ack(message)
    

    return this.nestorService.pegaUsuarioDeletados()
  }
}
