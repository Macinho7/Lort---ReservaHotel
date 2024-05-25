/* eslint-disable prettier/prettier */

import { QuartoEntidade } from '../Entidades/quarto.entity';
import { Repository } from 'typeorm';

import { criaQuartoDTO } from './dto/criaQuartoDTO';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { atualizarQuartoDTO } from './dto/atualizaQuartoDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
enum QuartoDisponivel {
  sim = 'sim',
  nao = 'nao'
}


@Injectable()
export class QuartoService {
  constructor(
    @InjectRepository(QuartoEntidade)
    private readonly quartoRepository: Repository<QuartoEntidade>,
    @InjectRepository(HotelEntidade)
    private readonly hotelRepository: Repository<HotelEntidade>
  ){}

  async criaQuartoHotel(idHotel: string, dados: criaQuartoDTO ): Promise<QuartoEntidade>{
    const hotel = await this.hotelRepository.findOne({where: {id: idHotel}})
    if(hotel === null){
      throw new NotFoundException('Id Hotel nao achado')
    }
    
    const quartoEntidade = new QuartoEntidade()
    quartoEntidade.id = dados.id
    quartoEntidade.tipo = dados.tipo
    quartoEntidade.preco = dados.preco
    if(quartoEntidade.preco < 0 || quartoEntidade.preco === 0){
      throw new UnauthorizedException('Preco Invalido')
    }
    quartoEntidade.cama = dados.cama
    quartoEntidade.tamanho = dados.tamanho
    quartoEntidade.hotel = hotel
    const quartoCriado = await this.quartoRepository.save(quartoEntidade)
    return quartoCriado
  }

  async atualizaQuarto(idHotel: string, idQuarto: string, dados: atualizarQuartoDTO){
    const hotel = await this.hotelRepository.findOne({where: {id: idHotel}})
    if(hotel === null){
      throw new NotFoundException('Id Hotel nao achado')
    }
    const quarto = await this.quartoRepository.findOne({where: {id: idQuarto}})
    if(quarto === null){
      throw new NotFoundException('Id Quarto nao achado')
    }
    let verdadeA = false
    for(let i = 0; hotel.quarto.length; i++){
      const QuartoAchado = hotel.quarto[i]
      if(QuartoAchado.id === quarto.id){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        verdadeA = true
        break
      }
    }
    if(!verdadeA){
      throw new UnauthorizedException(`Hotel: ${hotel.nome} nao possui esse quarto`)
    }
    quarto.tipo = dados.tipo
    quarto.tamanho = dados.tamanho
    quarto.preco = dados.preco
    if( quarto.preco < 0 ||  quarto.preco === 0){
      throw new UnauthorizedException('Preco Invalido')
    }
    quarto.cama = dados.cama
    quarto.hotel = hotel

    return await this.quartoRepository.save(quarto)
  }

  async listarQuartosDoHotel(id: string){
    const hotel = await this.hotelRepository.findOneBy({id})
    if(hotel === null){
      throw new NotFoundException('Id Hotel nao achado')
    }
    const quartosDoHotel =  hotel.quarto

    return quartosDoHotel
  }
  
  async HotelQuartoDisponiveis(idHotel: string){
    const hotel = await this.hotelRepository.findOne({where: {id: idHotel}})
    if(hotel === null){
      throw new NotFoundException('Hotel nao existe')
    }

    const quartosDisponiveis = hotel.quarto.filter((disponivel) => disponivel.disponivel === QuartoDisponivel.sim)
    return quartosDisponiveis
  }
  async listarUmQuartoDoHotel(idHotel: string, idQuarto: string){
    const hotel = await this.hotelRepository.findOne({where: {id: idHotel}})
    if(hotel === null){
      throw new NotFoundException('Id Hotel nao achado')
    }
    const quarto = await this.quartoRepository.findOne({where: {id: idQuarto}})
    if(quarto === null){
      throw new NotFoundException('Id Quarto nao achado')
    }
    let verdadeA = false
    for(let i = 0; hotel.quarto.length; i++){
      const QuartoAchado = hotel.quarto[i]
      if(QuartoAchado.id === quarto.id){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        verdadeA = true
        break
      }
    }
    if(!verdadeA){
      throw new UnauthorizedException(`Hotel: ${hotel.nome} nao possui esse quarto`)
    }
    return quarto
  }
  
  async deletarQuartoDoHotel(idHotel: string, idQuarto: string){
    const hotel = await this.hotelRepository.findOne({where: {id: idHotel}})
    if(hotel === null){
      throw new NotFoundException('Id Hotel nao achado')
    }
    const quarto = await this.quartoRepository.findOne({where: {id: idQuarto}})
    if(quarto === null){
      throw new NotFoundException('Id Quarto nao achado')
    }
    let verdadeA = false
    for(let i = 0; hotel.quarto.length; i++){
      const QuartoAchado = hotel.quarto[i]
      if(QuartoAchado.id === quarto.id){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        verdadeA = true
        break
      }
    }
    if(!verdadeA){
      throw new UnauthorizedException(`Hotel: ${hotel.nome} nao possui esse quarto`)
    }
    if(quarto.disponivel === QuartoDisponivel.nao){
      throw new UnauthorizedException('Quarto foi reservado, contate o cliente!')
    }
    quarto.hotel = hotel
    
    return await Promise.all([
      this.quartoRepository.remove(quarto),
      this.hotelRepository.save(hotel)
    ])
  }
}
