/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { atualizaUsuarioDTO } from 'apps/nestor/src/Dto/AtualizaUsuarioDTO';
import { CriaUsuario } from 'apps/nestor/src/Dto/UsuarioDTO';
import { criaHotelDTO } from 'apps/nestor/src/hotel/dto/criaHotelDTO';
import { atualizarQuartoDTO } from 'apps/nestor/src/quarto/dto/atualizaQuartoDTO';
import { criaQuartoDTO } from 'apps/nestor/src/quarto/dto/criaQuartoDTO';
import { atualizaReservaDTO } from 'apps/nestor/src/reserva/dto/atualizaReservaDTO';
import { CriaReservaDTO } from 'apps/nestor/src/reserva/dto/criaReservaDTO';
import { AppService } from './app.service';
import { criaAvaliacaoDTO } from 'apps/nestor/src/avaliacao/dto/criaAvaliacao';
import { atualizaAvaliacao } from 'apps/nestor/src/avaliacao/dto/atualizaAvaliacao';
import { criaServicoEspecial } from 'apps/nestor/src/servico-especial/dto/criaServico';
import { atualizaServico } from 'apps/nestor/src/servico-especial/dto/update-servico-especial.dto';
import {RateLimit, RateLimiterGuard} from 'nestjs-rate-limiter'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('Nestor_Service') private readonly authServico: ClientProxy) {}
  //Usuario
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 8, duration: 360, errorMessage: 'Muitas Requisicoes'})
  @Get('usuarios')
  async listarUsuarios(){
    return this.authServico.send(
      {
        cmd: 'get-usuarios'
      },
      {}
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 10, duration: 360, errorMessage: 'Muitas Requisicoes'})
  @Get('usuario/:id')
  async listarUsuario(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'get-usuario'
      }, id
    )
  }

  @Post('confirmarPagamento/:id/:id2/:id3')
  async confirmPayment(@Param('id') idUsuario: string,@Param('id2') idPagamento: string,@Param('id3') idReserva: string){
    return this.authServico.send(
      {
        cmd: 'post-pagamento-realizado'
      }, {idUsuario, idPagamento, idReserva}
    )
  }
  
  @Post('reembolsarPagamento/:id/:id2')
  async reembolso(@Param('id') idUsuario: string,@Param('id2') idPagamento: string){
    return this.authServico.send(
      {
        cmd: 'post-reembolso'
      }, {idUsuario, idPagamento}
    )
  }
  
  @Post('detalharReserva/:id/:id2')
  async detalheReserva(@Param('id') idHotel: string,@Param('id2') idReserva: string){
    return this.authServico.send(
      {
        cmd: 'post-detalheQuarto'
      }, {idHotel, idReserva}
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 3, duration: 360, errorMessage: 'Muitas Requisicoes'})
  @Post('usuario')
  async postarUsuario(@Body() usuario: CriaUsuario){
    return this.authServico.send(
      {
        cmd: 'post-usuario'
      }, usuario
    )
  }
  
  @Patch('usuario/:id/:id2')
  async atualizaUsuario(@Param('id') idCriador: string, @Param('id2') idUsuarioAtualizar: string, @Body() dados: atualizaUsuarioDTO){
    return this.authServico.send(
      {
        cmd: 'patch-usuario'
      },{idCriador, idUsuarioAtualizar, dados}
    )
  }
  
  @Delete('usuario/:id')
  async deletarUsuario(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'del-usuario'
      }, id 
    )
  }
  @Patch('usuario/:id')
  async restorarUsuario(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'res-usuario'
      }, id 
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 8, duration: 360, errorMessage: 'Muitas Requisicoes'})
  @Get('usuariosDeletados')
  async listarDeletados(){
    return this.authServico.send(
      {
        cmd: 'aoc-usuarios'
      }, {}
    )
  }

  //Hotel
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 12, duration: 360, errorMessage: 'Muitas Requisicoes'})
  @Get('hoteis')
  async listarHoteis(){
    return this.authServico.send(
      {
        cmd: 'get-hoteis'
      },
      {}
    )
  }
  
  @Get('hotel/:id')
  async listarHotel(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'get-hotel'
      }, id
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 10, duration: 600, errorMessage: 'Muitas Requisicoes'})
  @Post('hotel')
  async postarHotel(@Body() dados: criaHotelDTO){
    return this.authServico.send(
      {
        cmd: 'post-hotel'
      }, dados
    )
  }
  
  @Patch('hotel/:id')
  async atualizaHotel(@Param('id') id: string, @Body() dados: criaHotelDTO){
    return this.authServico.send(
      {
        cmd: 'patch-hotel'
      },{id, dados}
    )
  }
  
  @Delete('hotel/:id')
  async deletarHotel(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'del-hotel'
      }, id 
    )
  }
  @Get('hotelQuartos/:id')
  async listarQUartosHotel(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'get-quartos-hotel'
      }, id
    )
  }
  
  @Get('quartoEspecifico/:id/:id2')
  async listarQuartoHotel(@Param('id') idHotel: string, @Param('id2') idQuarto: string ){
    return this.authServico.send(
      {
        cmd: 'get-quarto-hotel'
    }, {idHotel, idQuarto}
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 10, duration: 600, errorMessage: 'Muitas Requisicoes'})
  @Post('quartoHotel/:id')
  async postarQuarto(@Param('id') idHotel: string, @Body() dados: criaQuartoDTO){
    return this.authServico.send(
      {
        cmd: 'post-quarto-hotel'
      }, {idHotel, dados}
    )
  }
  
  @Patch('hotel/:id/:id2')
  async atualizaQuartoHotel(@Param('id') idHotel: string,@Param('id2') idQuarto: string, @Body() dados: atualizarQuartoDTO){
    return this.authServico.send(
      {
        cmd: 'patch-quarto-hotel'
      },{idHotel, idQuarto, dados}
    )
  }
  
  @Delete('hotel/:id/:id2')
  async deletarQuarto(@Param('id') idHotel: string,@Param('id2') idQuarto: string){
    return this.authServico.send(
      {
        cmd: 'del-hotel'
      }, {idHotel, idQuarto}
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 8, duration: 400, errorMessage: 'Muitas Requisicoes'})
  @Get('usuarioServicos/:id')
  async listarReservaUsuario(@Param('id') id: string){
    return this.authServico.send(
      {
        cmd: 'get-reservas-usuario'
      }, id
    )
  }
  
  @Get('usuarioServico/:id/:id2')
  async listarServicosUsuario(@Param('id') idUsuario: string, @Param('id2') idService: string){
    return this.authServico.send(
      {
        cmd: 'get-reserva-usuario'
    }, {idUsuario, idService}
    )
  }
  @Post('usuarioReservarQuarto/:id/:id2')
  async criarReservas(@Param('id') idUsuario: string,@Param('id2') idQuarto: string, @Body() dados: CriaReservaDTO){
    return this.authServico.send(
      {
        cmd: 'post-reserva-usuario'
      }, {idUsuario, idQuarto, dados}
    )
  }
  @Get('pay/success/checkout/session')
  paymentSuccess(@Res({ passthrough: true }) res ) {

    return this.appService.SuccessSession(res)

  }
  @Patch('usuarioServiceQuarto/:id/:id2/:id3')
  async atualizaReservaUsuario(@Param('id') idUsuario: string, @Param('id2') idQuarto: string, @Param('id3') idService: string, @Body() dados: atualizaReservaDTO){
    return this.authServico.send(
      {
        cmd: 'patch-reserva-usuario'
      },{idUsuario, idQuarto, idService , dados}
    )
  }
  
  @Delete('usuarioService/:id/:id2/:id3')
  async (@Param('id') idUsuario: string,@Param('id2') idQuarto: string, @Param('id3') idService: string){
    return this.authServico.send(
      {
        cmd: 'del-reserva-usuario'
      }, {idUsuario, idQuarto, idService}
    )
  }
  @Post('avaliacaoHotel/:id/:id2')
  async avaliacaoParaHotel(@Param('id') idUsuario: string, @Param('id2') idHotel: string, @Body() dados: criaAvaliacaoDTO){
    return this.authServico.send(
      {
        cmd: 'post-avaliacaoHotel'
      },{idUsuario, idHotel, dados}
    )
  }
  @Delete('deletarAvaliacao/:id/:id2/:id3')
  async deletarAvaliacao(@Param('id') idUsuario: string, @Param('id2') idAvaliacao: string, @Param('id3') idHotel: string){
    return this.authServico.send(
      {
        cmd: 'del-avaliacaoHotel'
      },{idUsuario, idAvaliacao, idHotel}
    )
  }
  @Patch('atualizarAvaliacao/:id/:id2')
  async atualizarAvaliacao(@Param('id') idUsuario: string, @Param('id2') idAvaliacao: string, @Body() dados: atualizaAvaliacao){
    return this.authServico.send(
      {
        cmd: 'patch-avaliacaoHotel'
      },{idUsuario, idAvaliacao, dados}
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 8, duration: 400, errorMessage: 'Muitas Requisicoes'})
  @Get('avaliacoesDoHotel/:id')
  async avaliacoesDoHotel(@Param('id') idHotel: string){
    return this.authServico.send(
      {
        cmd: 'get-avaliacoesHotel'
      }, idHotel
    )
  }
  @Post('servicoParaQuarto/:id/:id2')
  async servicoEspecialQuarto(@Param('id') idHotel: string,@Param('id2') idQuarto: string, @Body() dados: criaServicoEspecial){
    return this.authServico.send(
      {
        cmd: 'post-servicoEspecialQuarto'
      }, {idHotel, idQuarto, dados}
    )
  }
  @Patch('servicoParaAtualizar/:id/:id2')
  async servicoAtualiza(@Param('id') idHotel: string,@Param('id2') idServico: string, @Body() dados: atualizaServico){
    return this.authServico.send(
      {
        cmd: 'patch-servicoEspecialQuarto'
      }, {idHotel, idServico, dados}
    )
  }
  @Delete('deletarServico/:id/:id2')
  async deletarServico(@Param('id') idHotel: string,@Param('id2') idServico: string){
    return this.authServico.send(
      {
        cmd: 'del-servicoEspecialQuarto'
      }, {idHotel, idServico}
    )
  }
  @UseGuards(RateLimiterGuard)
  @RateLimit({points: 10, duration: 300, errorMessage: 'Muitas Requisicoes'})
  @Get('usuarioPagamentos/:id')
  async listarPagamentosUsuario(@Param('id') idHotel: string){
    return this.authServico.send(
      {
        cmd: 'get-pagamentosUsuario'
    }, idHotel
    )
  }
  @Delete('deletarPagamento/:id/:id2')
  async deletarPagamentoUsuario(@Param('id') idUsuario: string, @Param('id2') idPagamento: string){
    return this.authServico.send(
      {
        cmd: 'del-usuarioPagamento'
      }, {idUsuario, idPagamento}
    )
  }
}
