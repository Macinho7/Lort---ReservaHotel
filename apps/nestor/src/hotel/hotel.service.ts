/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { criaHotelDTO } from './dto/criaHotelDTO';
import { atualizaHotelDTO } from './dto/atualizaHotelDTO';
enum QuartoDisponivel {
  sim = 'sim',
  nao = 'nao'
}
@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(HotelEntidade)
    private readonly hotelRepository: Repository<HotelEntidade>
  ){}

  async criarHotel(dados: criaHotelDTO){
    const hotelEntidade = new HotelEntidade()
    hotelEntidade.id = dados.id
    hotelEntidade.nome  = dados.nome
    hotelEntidade.endereco = dados.endereco
    hotelEntidade.descricao = dados.descricao
    hotelEntidade.estrelas = dados.estrelas
    if(hotelEntidade.estrelas <= 0 || hotelEntidade.estrelas > 5){
      throw new UnauthorizedException('Informacao invalida: Campo estrelas')
    }
    hotelEntidade.tipo = dados.tipo
    
    const hotelCriado = await this.hotelRepository.save(hotelEntidade)
    return hotelCriado
  }

  async atualizarHotel(id: string, dados: atualizaHotelDTO){
    const hotel = await this.hotelRepository.findOneBy({id})
    hotel.nome = dados.nome
    hotel.endereco = dados.endereco
    hotel.descricao = dados.descricao
    hotel.tipo = dados.tipo

    const hotelAtualizado = await this.hotelRepository.save(hotel)
    return hotelAtualizado
  }

  async listarHoteis(){
    const hoteis = await this.hotelRepository.find()

    return hoteis
  }

  async listarHotel(id: string){
    const hotel = await this.hotelRepository.findOneBy({id})
    
    return hotel
  }
  async deleraHotel(id: string){
    const hotel = await this.hotelRepository.findOneBy({id})
    for(const quarto of hotel.quarto){
      if(quarto.disponivel === QuartoDisponivel.nao){
        throw new UnauthorizedException('Quartos ainda reservados! consulte os clientes.')
      }
    }

    return await this.hotelRepository.remove(hotel)
  }

}
