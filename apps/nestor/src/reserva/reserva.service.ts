/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaEntidade } from '../Entidades/reserva.entity';
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { QuartoEntidade } from '../Entidades/quarto.entity';
import { atualizaReservaDTO } from './dto/atualizaReservaDTO';
import { CriaReservaDTO } from './dto/criaReservaDTO';
import { PagamentoEntidade } from '../Entidades/pagamento.entity';
import { randomUUID } from 'crypto';
import {Stripe} from 'stripe';
import { AcharMetodos } from '../metodosDeProcura/acharMetodos';
const stripe = new Stripe('Sua Secret Key')

enum Pago {
  nao = 'nao',
  sim = 'sim',
  estornado = 'estornado'
}
enum Reserva {
  pendente = 'pendente',
  confirmada = 'confirmada',
  estornado = 'estornado',
  negada = 'negada'
}
enum PagamentoCartao {
  cartao_credeb = 'credeb',
  teste1 = 'teste1',
  teste2 = 'teste2'
}
enum clientChegou {
  sim = 'sim',
  nao = 'nao'
}
enum QuartoDisponivel {
  sim = 'sim',
  nao = 'nao'
}
@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(ReservaEntidade)
    private readonly reservaRepository:Repository<ReservaEntidade>,
    @InjectRepository(UsuarioEntidade)
    private readonly usuarioRepository:Repository<UsuarioEntidade>,
    @InjectRepository(QuartoEntidade)
    private readonly quartoRepository:Repository<QuartoEntidade>,
    @InjectRepository(PagamentoEntidade)
    private readonly pagamentoRepository:Repository<PagamentoEntidade>,
    private readonly metodosAcharId: AcharMetodos
    
  ){}
  
  async verificarAnoBissexto(ano: number){
    const anoPorQuatro = ano / 4
    const anoPorQuatrocentos = ano / 400
    if(Number.isInteger(anoPorQuatro) || Number.isInteger(anoPorQuatrocentos)){
      console.log('Ano e bissexto')
      return true
    }else{
      console.log('Ano nao e bissexto')
      return false
    }
  }
  async validarDatas(dataIncial: string, dataFinal: string, pagamentoS: number){
    const data = new Date()
    const anoAtual = data.getFullYear().toString()
    const mesAtual = (data.getMonth() + 1).toString() 
    const diaAtual = data.getDate().toString()
    const dataQuebrada = dataIncial.split('/')
    let diaInicial = dataQuebrada[0]
    let mesInicial = dataQuebrada[1]
    const anoInicial = dataQuebrada[2]
    const dataQuebrada2 = dataFinal.split('/')
    let diaFinal = dataQuebrada2[0]
    let mesFinal = dataQuebrada2[1]
    const anoFInal = dataQuebrada2[2]
  
    const diaInicial1 = diaInicial[0]
    const diaInicial2 = diaInicial[1]
    const diaFinal1 = diaFinal[0]
    const diaFinal2 = diaFinal[1] 

    const mesFinal1 = mesFinal[0]
    const mesfinal2 = mesFinal[1]
    const mesInicio1 = mesInicial[0]
    const mesInicio2 = mesInicial[1]
  
    if(diaInicial1 === '0'){

      diaInicial = diaInicial2
    }else {
      
      diaInicial = diaInicial
    }
    if(diaFinal1 === '0'){
      
      diaFinal = diaFinal2
    }else {
      
      diaFinal = diaFinal
    }
    if(mesInicio1 === '0'){
      
      mesInicial = mesInicio2
    }else {
      
      mesInicial = mesInicial
    }
    if(mesFinal1 === '0'){
      
      mesFinal = mesfinal2
    }else {
      
      mesFinal = mesFinal
    }
    if(parseInt(mesInicial) === 1 || parseInt(mesFinal) === 1){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('Janeiro tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de janeiro invalido')
      }
    }
    if(parseInt(mesInicial) === 2 || parseInt(mesFinal) === 2){
      const verificado = await this.verificarAnoBissexto(parseInt(anoAtual))
      if(verificado === true){
        if(parseInt(diaInicial) > 29 || parseInt(diaFinal) > 29){
          throw new UnauthorizedException('Fevereiro tem 29 dias')
        }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
          throw new UnauthorizedException('Dia de Fevereiro invalido')
        }
      }else if(verificado === false){
        if(parseInt(diaInicial) > 28 || parseInt(diaFinal) > 28){
          throw new UnauthorizedException('Fevereiro tem 28 dias')
        }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
          throw new UnauthorizedException('Dia de Fevereiro invalido')
        }
      }
    }
    if(parseInt(mesInicial) === 3 || parseInt(mesFinal) === 3){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('Marco tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de Marco invalido')
      }
    }
    if(parseInt(mesInicial) === 4 || parseInt(mesFinal) === 4){
      if(parseInt(diaInicial) > 30 || parseInt(diaFinal) > 30){
        throw new UnauthorizedException('abril tem 30 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de abril invalido')
      }
    }
    if(parseInt(mesInicial) === 5 || parseInt(mesFinal) === 5){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('Maio tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de Maio invalido')
      }
    }
    if(parseInt(mesInicial) === 6 || parseInt(mesFinal) === 6){
      if(parseInt(diaInicial) > 30 || parseInt(diaFinal) > 30){
        throw new UnauthorizedException('junho tem 30 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de junho invalido')
      }
    }
    if(parseInt(mesInicial) === 7 || parseInt(mesFinal) === 7){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('julho tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de julho invalido')
      }
    }
    if(parseInt(mesInicial) === 8 || parseInt(mesFinal) === 8){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('Agosto tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de Agosto invalido')
      }
    }
    if(parseInt(mesInicial) === 9 || parseInt(mesFinal) === 9){
      if(parseInt(diaInicial) > 30 || parseInt(diaFinal) > 30){
        throw new UnauthorizedException('Setembro tem 30 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de Setembro invalido')
      }
    }
    if(parseInt(mesInicial) === 10 || parseInt(mesFinal) === 10){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('outubro tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de outubro invalido')
      }
    }
    if(parseInt(mesInicial) === 11 || parseInt(mesFinal) === 11){
      if(parseInt(diaInicial) > 30 || parseInt(diaFinal) > 30){
        throw new UnauthorizedException('Novembro tem 30 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de Novembro invalido')
      }
    }
    if(parseInt(mesInicial) === 12 || parseInt(mesFinal) === 12){
      if(parseInt(diaInicial) > 31 || parseInt(diaFinal) > 31){
        throw new UnauthorizedException('Dezembro tem 31 dias')
      }else if(parseInt(diaInicial) < 0 || parseInt(diaFinal) < 0){
        throw new UnauthorizedException('Dia de Dezembro invalido')
      }
    }
  
    if(parseInt(mesInicial) > 12){
      throw new UnauthorizedException("Mes inicial nao existe")
    }
    if(parseInt(mesFinal) > 12){
      throw new UnauthorizedException("Mes final nao existe")
    }
    if(parseInt(mesInicial) < 0){
      throw new UnauthorizedException("Mes inicial nao existe")
    }
    if(parseInt(mesFinal) < 0){
      throw new UnauthorizedException("Mes final nao existe")
    }
    if(parseInt(anoInicial) < parseInt(anoAtual)){
      throw new UnauthorizedException("Ano Inicial invalido")
    }
    if(parseInt(anoInicial) > parseInt(anoAtual)){
      throw new UnauthorizedException("Reservas com meses apenas de diferenca")
    }
    if(parseInt(anoFInal) > parseInt(anoAtual)){
      throw new UnauthorizedException("Reservas com meses apenas de diferenca")
    }
    if(parseInt(anoAtual) === parseInt(anoInicial)){
      console.log('anos iguais')
      if(parseInt(mesInicial) < parseInt(mesAtual)){
        throw new UnauthorizedException('Mes Inicial invalido')
      }
      if(parseInt(mesInicial) === parseInt(mesAtual)){
        if(parseInt(dataIncial) < parseInt(diaAtual)){
          throw new UnauthorizedException('dia Inicial invalido')
        }
        if(parseInt(diaInicial) === parseInt(diaAtual)){
          throw new UnauthorizedException('Reserva somente para o dia seguinte')
        }
      }
    }
    if(parseInt(anoFInal) < parseInt(anoInicial)){
      throw new UnauthorizedException('Ano final invalido')
    } else if(anoInicial === anoFInal){
      if(parseInt(mesFinal) < parseInt(mesInicial)){
        throw new UnauthorizedException('Mes final invalido')
      }
      if(parseInt(mesFinal) === parseInt(mesInicial)){
        if(parseInt(diaFinal) < parseInt(diaInicial)){
          throw new UnauthorizedException('Dia final invalido')
        }
        if(parseInt(diaInicial) === parseInt(diaFinal)){
          throw new UnauthorizedException('Data final invalido para o mesmo dia')
        }
      }
    }
    const mesCalculado = parseInt(mesFinal)  - parseInt(mesInicial)
    if(mesCalculado === 1){
      pagamentoS *= 2
    }
    if(mesCalculado === 2){
      pagamentoS *= 3
    }
    if(mesCalculado === 3){
      pagamentoS *= 4
    }
    if(mesCalculado === 4){
      pagamentoS *= 5
    }
    if(mesCalculado === 5){
      pagamentoS *= 6
    }
    if(mesCalculado === 6){
      pagamentoS *= 7
    }
    if(mesCalculado === 7){
      pagamentoS *= 8
    }
    if(mesCalculado === 8){
      pagamentoS *= 9
    }
    if(mesCalculado === 9){
      pagamentoS * 10
    }
    if(mesCalculado === 10){
      pagamentoS *= 11
    }
    if(mesCalculado === 11){
      pagamentoS *= 12
    }
    if(mesCalculado === 0){
      throw new BadRequestException('Reservas somente entre meses de diferenca!')
    }
   
    const dataInicialNova = `${anoInicial}-${mesInicial}-${diaInicial}`
    const dataFinallNova = `${anoFInal}-${mesFinal}-${diaFinal}`
    return {
      dataInicialNova, dataFinallNova, pagamentoS
    }
  }
  async criaReservaQuarto(idUsuario: string, idQuarto: string, dados: CriaReservaDTO){
    try{
      const usuarioPagamento = await this.metodosAcharId.acharUsuario(idUsuario)
    
      const quartoPagamento = await this.metodosAcharId.acharQuarto(idQuarto)
      if(quartoPagamento === null){
        throw new NotFoundException('Quarto nao achado')
      }
      if(quartoPagamento.disponivel === QuartoDisponivel.nao){
        throw new UnauthorizedException('Quarto nao disponivel para reserva')
      }
  
      const dataEpagamentoS = await this.validarDatas(dados.inicio, dados.fim, quartoPagamento.preco)
      const pagamentoEntidade = new PagamentoEntidade()
      pagamentoEntidade.id = randomUUID()
      pagamentoEntidade.usuario = usuarioPagamento
      pagamentoEntidade.usuarioPagamento = usuarioPagamento.nome
      pagamentoEntidade.Pago = Pago.nao
      pagamentoEntidade.valor = dataEpagamentoS.pagamentoS
      pagamentoEntidade.idQuartoeSecret = quartoPagamento.id
      pagamentoEntidade.pagamentoDoCartao = PagamentoCartao.cartao_credeb
      const dataS = new Date()
      dataS.setUTCHours(dataS.getUTCHours() - 3)
      const dataAtual = dataS.toISOString()
      pagamentoEntidade.data_pagamento = dataAtual  
  
 
      const reservaEntidade = new ReservaEntidade()
      reservaEntidade.id = randomUUID()
      reservaEntidade.usuario = usuarioPagamento
      const dataInicio = dataEpagamentoS.dataInicialNova
      const dataFinal = dataEpagamentoS.dataFinallNova
      reservaEntidade.inicio = dataInicio
      reservaEntidade.fim = dataFinal
      reservaEntidade.Reserva = Reserva.pendente
      reservaEntidade.idQuartoeSecret = quartoPagamento.id
      reservaEntidade.clientArrive = clientChegou.nao
    
      const usuarioFIN = {
        email: usuarioPagamento.email,
        name: usuarioPagamento.nome,
        address: {
          city: usuarioPagamento.pais,
          country: 'BR',
        },
      };
      const valorAPagar = pagamentoEntidade.valor * 100
      
      const novoPreco = await stripe.prices.create({
        unit_amount: valorAPagar, 
        currency: 'BRL', 
        product_data: {
            name: 'Quarto', 
            
        },
    });
    
    const pagamentoTT = await stripe.paymentIntents.create({
      amount: valorAPagar, // Defina o valor do pagamento aqui
      currency: 'BRL', // Defina a moeda do pagamento aqui
      metadata: {
          user_id: usuarioPagamento.id // Aqui está o ID do usuário como metadado
      }
    });
      //const precoS = quartoPagamento.preco.toString()
        // Criar sessão de checkout
        const session = await stripe.checkout.sessions.create({
          line_items: [{ price: novoPreco.id, quantity: 1 }],
          mode: 'payment',
          payment_intent_data: {
            setup_future_usage: 'on_session', 
          },   
          customer_email: usuarioFIN.email,
          client_reference_id: usuarioFIN.name,
          success_url: 'http://localhost:4000/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: 'http://localhost:4000/pay/failed/checkout/session',
          metadata: {
            payment_id: usuarioPagamento.id
          }
        });
        pagamentoEntidade.urlPayment = session.url
        pagamentoEntidade.idReservaSecret = reservaEntidade.id
        pagamentoEntidade.idPagamentoSK = session.id
        session.payment_intent = pagamentoTT
    
  
      return Promise.all([
          this.usuarioRepository.save(usuarioPagamento),
          this.reservaRepository.save(reservaEntidade),
          this.pagamentoRepository.save(pagamentoEntidade)
      ])
    } catch(erroException){
      console.log(erroException)
    }
  }
  
  async confirmarPagamento(idUsuario: string, idPagamento: string, idReserva: string){
    try{
        const usuario = await this.metodosAcharId.acharUsuario(idUsuario)
      if( usuario === null){
        throw new NotFoundException('Usuario nao achado')
      }
      
      const pagamento = await this.metodosAcharId.acharPagamento(idPagamento)
      if( pagamento === null){
        throw new NotFoundException('Pagamento nao achado')
      }

      const idQuarto = pagamento.idQuartoeSecret
      const Quarto = await this.metodosAcharId.acharQuarto(idQuarto)
      if( Quarto === null){
        throw new NotFoundException('Quarto nao achado')
      }
      if(pagamento.Pago === Pago.sim){
        throw new NotFoundException('Pagamento ja confirmado')
      }
      // if(Quarto.disponivel === QuartoDisponivel.sim && pagamento.idQuartoeSecret === Quarto.id ){
      //   throw new NotFoundException('Voce ja confirmou o pagamento :)')
      // }
      const reserva = await this.reservaRepository.findOne({where: {id: idReserva}})
      if( reserva === null){
        throw new NotFoundException('Reserva nao achado')
      }
      if(reserva.Reserva === Reserva.confirmada){
        throw new NotFoundException('Reserva ja confirmada para um quarto')
      }
      if(Quarto.disponivel === QuartoDisponivel.nao){
        throw new UnauthorizedException('Quarto nao disponivel para reserva')
      }
      if(pagamento.idReservaSecret !== reserva.id){
        throw new NotFoundException('Pagamento nao foi gerado para essa reserva')
      }
      if(pagamento.Pago === Pago.estornado){
        throw new UnauthorizedException('Pagamento ja foi reembolsado')
      }
      if(reserva.Reserva === Reserva.estornado){
        throw new UnauthorizedException('Reserva ja foi desfeita')
      }
      const compraP = await stripe.checkout.sessions.retrieve(pagamento.idPagamentoSK)
      const paY = compraP.payment_intent
      //const remmB = await stripe.refunds.create({payment_intent: paY.toString()})
      console.log(paY)
      if(compraP.metadata.payment_id !== usuario.id){
        console.log()
        throw new UnauthorizedException('Voce nao gerou esse pagamento')
      }
    
      console.log(compraP.payment_status)
      if(compraP.payment_status === 'paid' && compraP.status === 'complete'){
        reserva.Reserva = Reserva.confirmada
        pagamento.Pago = Pago.sim
        Quarto.disponivel = QuartoDisponivel.nao
        await this.quartoRepository.save(Quarto)
        await this.reservaRepository.save(reserva),
        await this.pagamentoRepository.save(pagamento)
        return Promise.all([
          await this.usuarioRepository.save(usuario),
        ])
      }else {
        throw new UnauthorizedException(`pagou nao :(, compra em aberto, preco a pagar: ${pagamento.valor}`)
      }
    }catch(erroException){
      console.log(erroException)
    }
    
    
  }

  async fazerReembolso(idUsuario: string, idPagamento: string){
    try{
      const usuarioR = await this.metodosAcharId.acharUsuario(idUsuario)
    const pagamento = await this.metodosAcharId.acharPagamento(idPagamento)
    
    const secao = await stripe.checkout.sessions.retrieve(pagamento.idPagamentoSK)
    if(secao.metadata.payment_id !== usuarioR.id){
      console.log()
      throw new UnauthorizedException('Voce nao gerou esse pagamento')
    }
    const reserva = await this.reservaRepository.findOne({where: {id: pagamento.idReservaSecret}})
    if(reserva.clientArrive === clientChegou.sim){
      throw new UnauthorizedException('Cliente nao pode reembolsar apos usar o quarto!')
    }
    const quarto = await this.quartoRepository.findOne({where: {id: pagamento.idQuartoeSecret}})
    if(pagamento.Pago === Pago.nao){
      throw new UnauthorizedException('Pagamento nao foi reembolsado, pagamento ainda nao concluido ou pago para fazer o reembolso')
    }
    if(quarto.disponivel === QuartoDisponivel.nao){
      quarto.disponivel = QuartoDisponivel.sim
    }else{
      throw new UnauthorizedException('Ocorreu um erro!')
    }
    
    reserva.Reserva = Reserva.estornado
    pagamento.Pago = Pago.estornado
    const payS = secao.payment_intent
    await stripe.refunds.create({payment_intent: String(payS)})
    await this.quartoRepository.save(quarto)
    await this.reservaRepository.save(reserva)
    await this.pagamentoRepository.save(pagamento)

    return pagamento
    }catch(erroException){
      console.log(erroException)
    }
    
  }
  async detalhar(idHotel: string, idReserva: string){
    try{
      const hotel = await this.metodosAcharId.acharHotel(idHotel)
      const reserva = await this.metodosAcharId.acharReserva(idReserva)

      reserva.clientArrive = clientChegou.sim

      await this.usuarioRepository.save(hotel)
      const reservaRP = await this.reservaRepository.save(reserva)
      return reservaRP
    }catch(erroException){
      console.log(erroException)
    }
    
  }
  async atualizarReserva(idUsuario: string, idQuarto: string, idReserva: string, dados: atualizaReservaDTO){
    const usuarioAchado = await this.usuarioRepository.findOne({where: {id: idUsuario}})
    if(usuarioAchado === null){
      throw new UnauthorizedException('Hotel nao achado')
    }
    const quartoAchado = await this.quartoRepository.findOne({where: {id: idQuarto}})
    if(quartoAchado === null){
      throw new UnauthorizedException('Quarto nao achado')
    }
    const reservaAchada = await this.reservaRepository.findOne({where: {id: idReserva}})
    if(reservaAchada === null){
      throw new UnauthorizedException('Reserva nao achado')
    }
    const reservasUsuarios = usuarioAchado.reserva
    for(let i = 0; reservasUsuarios.length; i++){
      const reserva = reservasUsuarios[i]
      if(reserva.id === reservaAchada.id){
        break
      } else {
        throw new NotFoundException('Usuario nao possui essa reserva')
      }
    }
    reservaAchada.inicio = dados.inicio
    reservaAchada.fim = dados.fim
    return await Promise.all([
      this.usuarioRepository.save(usuarioAchado),
      this.quartoRepository.save(quartoAchado),
      this.reservaRepository.save(reservaAchada)
    ])

  }

  async listarReservasDoUsuario(idUsuario: string){
    const usuario = await this.usuarioRepository.findOne({where: {id: idUsuario}})
    if(usuario === null){
      throw new UnauthorizedException('usuario nao achado')
    }
    const reservasDoUsuario = usuario.reserva

    return reservasDoUsuario
  }

  async listarReservaDoUsuario(idUsuario: string, idReserva: string){
    const usuario = await this.usuarioRepository.findOne({where: {id: idUsuario}})
    if(usuario === null){
      throw new UnauthorizedException('Usuario nao achado')
    }
    const reserva = await this.reservaRepository.findOne({where: {id: idReserva}})
    if( reserva === null){
      throw new UnauthorizedException('Reserva nao achado')
    }
    const reservasUsuarios = usuario.reserva
    for(let i = 0; reservasUsuarios.length; i++){
      const reserva = reservasUsuarios[i]
      if(reserva.id === reserva.id){
        break
      } else {
        throw new NotFoundException('Usuario nao possui essa reserva')
      }
    }

    return reserva
  }

  async deletarReserva(idUsuario: string,idQuarto: string, idReserva: string){
    const usuario = await this.usuarioRepository.findOne({where: {id: idUsuario}})
    if(usuario === null){
      throw new UnauthorizedException('Usuario nao achado')
    }
    const reserva = await this.reservaRepository.findOne({where: {id: idReserva}})
    if( reserva === null){
      throw new UnauthorizedException('Reserva nao achado')
    }
    const quarto = await this.quartoRepository.findOne({where: {id: idQuarto}})
    if( quarto === null){
      throw new UnauthorizedException('Quarto nao achado')
    }
    const reservasUsuarios = usuario.reserva
    for(let i = 0; reservasUsuarios.length; i++){
      const reserva = reservasUsuarios[i]
      if(reserva.id === reserva.id){
        break
      } else {
        throw new NotFoundException('Usuario nao possui essa reserva')
      }
    }
    if(quarto.disponivel === QuartoDisponivel.nao){
      quarto.disponivel = QuartoDisponivel.sim
    }
    return await Promise.all([
      this.usuarioRepository.save(usuario),
      this.quartoRepository.save(quarto),
      this.reservaRepository.delete(reserva)
    ])
  }

}
