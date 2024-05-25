/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntidade } from '../Entidades/reserva.entity';
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { QuartoEntidade } from '../Entidades/quarto.entity';
import { PagamentoEntidade } from '../Entidades/pagamento.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { ServicoEspecialEntidade } from '../Entidades/servico-especial.entity';
import { AvaliacaoEntidade } from '../Entidades/avaliacao.entity';

export class AcharMetodos {
  constructor(
    @InjectRepository(ReservaEntidade)
    private readonly reservaRepository: Repository<ReservaEntidade>,
    @InjectRepository(UsuarioEntidade)
    private readonly usuarioRepository: Repository<UsuarioEntidade>,
    @InjectRepository(QuartoEntidade)
    private readonly quartoRepository: Repository<QuartoEntidade>,
    @InjectRepository(PagamentoEntidade)
    private readonly pagamentoRepository: Repository<PagamentoEntidade>,
    @InjectRepository(HotelEntidade)
    private readonly hotelRepository: Repository<HotelEntidade>,
    @InjectRepository(AvaliacaoEntidade)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntidade>,
    @InjectRepository(ServicoEspecialEntidade)
    private readonly SespecialRepository: Repository<ServicoEspecialEntidade>,
  ) {}
  async acharUsuario(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    if (p) {
      throw new BadRequestException('id e um pagamento e nao um usuario');
    } else if(h){
        throw new BadRequestException('id e um hotel e nao um usuario');
    } else if(s){
        throw new BadRequestException('id e um servico de um quarto e nao um usuario');
    }else if (r) {
      throw new BadRequestException('id e uma reserva e nao um usuario');
    } else if (q) {
      throw new BadRequestException('id e um quarto e nao um usuario');
    } else if (u) {
      return u;
    } else {
      throw new NotFoundException('id nao existe');
    }
  }
  async acharQuarto(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    if (u) {
      throw new BadRequestException('id e um usuario e nao um quarto');
    } else if(h){
        throw new BadRequestException('id e um hotel e nao um quarto');
    } else if(s){
        throw new BadRequestException('id e um servico de um quarto e nao um quarto');
    }else if (r) {
      throw new BadRequestException('id e uma reserva e nao um quarto');
    } else if (p) {
      throw new BadRequestException('id e um pagamento e nao um quarto');
    } else if (q) {
      return q;
    } else {
      throw new NotFoundException('id nao existe');
    }
  }
  async acharReserva(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    if (u) {
      throw new BadRequestException('id e um usuario e nao um reserva');
    } else if(h){
        throw new BadRequestException('id e um hotel e nao um reserva');
    } else if(s){
        throw new BadRequestException('id e um servico de um quarto e nao um reserva');
    } else if (p) {
      throw new BadRequestException('id e uma pagamento e nao um reserva');
    } else if (q) {
      throw new BadRequestException('id e um quarto e nao um reserva');
    } else if (r) {
      return r;
    } else {
      throw new NotFoundException('id nao existe');
    }
  }
  async acharPagamento(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    if (u) {
      throw new BadRequestException('id e um usuario e nao um pagamento');
    } else if(h){
        throw new BadRequestException('id e um hotel e nao um pagamento');
    } else if(s){
        throw new BadRequestException('id e um servico de um quarto e nao um pagamento');
    }else if (r) {
      throw new BadRequestException('id e uma reserva e nao um pagamento');
    } else if (q) {
      throw new BadRequestException('id e um quarto e nao um pagamento');
    } else if (p) {
      return p;
    } else {
      throw new NotFoundException('id nao existe');
    }
  }
  async acharHotel(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    if (p) {
      throw new BadRequestException('id e um pagamento e nao um hotel');
    } else if (r) {
      throw new BadRequestException('id e uma reserva e nao um hotel');
    } else if (q) {
      throw new BadRequestException('id e um quarto e nao um hotel');
    } else if (u) {
        throw new BadRequestException('id e um usuario e nao um hotel');
    } else if(s){
        throw new BadRequestException('id e um servico de um quarto e nao um hotel');
    } else if(h){
        return h
    } else {
        throw new NotFoundException('id nao existe');
    }
  }
  async acharServico(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    if (p) {
        throw new BadRequestException('id e um pagamento e nao um servico de um quarto');
      } else if (r) {
        throw new BadRequestException('id e uma reserva e nao um servico de um quarto');
      } else if (q) {
        throw new BadRequestException('id e um quarto e nao um servico de um quarto');
      } else if (u) {
          throw new BadRequestException('id e um usuario e nao um servico de um quarto');
      } else if(h){
          throw new BadRequestException('id e um hotel e nao um servico de um quarto');
      } else if(s){
          return s
      } else {
          throw new NotFoundException('id nao existe');
      }
  }
  async acharAvaliacao(dados: any) {
    const u = await this.usuarioRepository.findOne({ where: { id: dados } });
    const p = await this.pagamentoRepository.findOne({ where: { id: dados } });
    const r = await this.reservaRepository.findOne({ where: { id: dados } });
    const q = await this.quartoRepository.findOne({ where: { id: dados } });
    const h = await this.hotelRepository.findOne({ where: { id: dados } });
    const s = await this.SespecialRepository.findOne({ where: { id: dados } });
    const a = await this.avaliacaoRepository.findOne({ where: { id: dados } });
    if (p) {
        throw new BadRequestException('id e um pagamento e nao uma avaliacao de um hotel');
      } else if (r) {
        throw new BadRequestException('id e uma reserva e nao uma avaliacao de um hotel');
      } else if (q) {
        throw new BadRequestException('id e um quarto e nao uma avaliacao de um hotel');
      } else if (u) {
          throw new BadRequestException('id e um usuario e nao uma avaliacao de um hotel');
      } else if (s) {
        throw new BadRequestException('id e um servico e nao uma avaliacao de um hotel');
      } else if(h){
          throw new BadRequestException('id e um hotel e nao um avalaicao de um hotel');
      } else if(a){
          return a
      } else {
          throw new NotFoundException('id nao existe');
      }
  }
}
