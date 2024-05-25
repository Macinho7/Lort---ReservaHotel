/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReservaEntidade } from '../Entidades/reserva.entity';
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { Repository } from 'typeorm';
import { PagamentoEntidade } from '../Entidades/pagamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AcharMetodos } from '../metodosDeProcura/acharMetodos';

enum Pago {
  nao = 'nao',
  sim = 'sim',
  estornado = 'estornado'
}

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(UsuarioEntidade)
    private readonly usuarioRepository:Repository<UsuarioEntidade>,
    @InjectRepository(ReservaEntidade)
    private readonly reservaRepository:Repository<ReservaEntidade>,
    @InjectRepository(PagamentoEntidade)
    private readonly pagamentoRepository:Repository<PagamentoEntidade>,
    private readonly metodosAcharId: AcharMetodos
  ){}
  async verificaPagamentoPropio(idUsuario: string, idPagamento: string){
    const usuario = await this.metodosAcharId.acharUsuario(idUsuario)
    const pagamento = await this.metodosAcharId.acharPagamento(idPagamento)
    const achouPagamento = usuario.pagamentos.find((meuID) => pagamento.id === meuID.id) 
    if(achouPagamento){
      return {
        usuario, pagamento
      }
    }else{
      throw new UnauthorizedException("Voce nao possui esse pagamento!")
    }
  }
  async listarPagamentosUsuario(idUsuario: string){
    const usuario = await this.metodosAcharId.acharUsuario(idUsuario)
    const pagamentosUsuario =  usuario.pagamentos
    return {Pagamentos:  pagamentosUsuario}
  }

  async deletarPagamento(idUsuario: string, idPagamento: string){
    const dadosRespsota = await this.verificaPagamentoPropio(idUsuario, idPagamento)

    const idReserva = dadosRespsota.pagamento.idReservaSecret
    const reserva = await this.metodosAcharId.acharReserva(idReserva)
  
    
    if(dadosRespsota.pagamento.Pago === Pago.sim){
      throw new UnauthorizedException("Apagar seu pagamento nao lhe faz receber seu estorno!")
    }
    
    await this.usuarioRepository.save(dadosRespsota.usuario)
    await this.reservaRepository.delete(reserva)
    await this.pagamentoRepository.delete(dadosRespsota.pagamento)
    
    return {
      Pagamento_deletado: dadosRespsota.pagamento
    }

  }
}
