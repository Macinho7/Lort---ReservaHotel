/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { QuartoEntidade } from '../Entidades/quarto.entity';
import { ServicoEspecialEntidade } from '../Entidades/servico-especial.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { criaServicoEspecial } from './dto/criaServico';
import { AcharMetodos } from '../metodosDeProcura/acharMetodos';
import { atualizaServico } from './dto/update-servico-especial.dto';


@Injectable()
export class ServicoEspecialService {
  constructor(
    @InjectRepository(ServicoEspecialEntidade)
    private readonly servicoRepository:Repository<ServicoEspecialEntidade>,
    @InjectRepository(HotelEntidade)
    private readonly hotelRepository:Repository<HotelEntidade>,
    @InjectRepository(QuartoEntidade)
    private readonly quartoRepository:Repository<QuartoEntidade>,
    private readonly metodosAcharId: AcharMetodos
  ){}
  async verificaServicoQuarto(idHotel: string, idServico: string){
    const hotel = await this.metodosAcharId.acharHotel(idHotel)
    const servico = await this.metodosAcharId.acharServico(idServico)
    for(const quarto of hotel.quarto){
      for(const servicos of quarto.servicoEspecial){
        if(servico.id === servicos.id){
          console.log(servico)
          return servico
        }{
          throw new UnauthorizedException('Servico nao achado')
        }
      }
    }
  }

  async criaServicoEspecialQuarto(idHotel: string, idQuarto: string, dados: criaServicoEspecial ): Promise<ServicoEspecialEntidade>{
    const hotel = await this.metodosAcharId.acharHotel(idHotel)
    const quarto = await this.metodosAcharId.acharQuarto(idQuarto)

    const verifica =  hotel.quarto.find((meuId) => quarto.id === meuId.id)  
    if(!verifica){
      throw new UnauthorizedException('Hotel nao possui esse quarto')
    }
    const servicoEntidade = new ServicoEspecialEntidade()
    if(quarto.servicoEspecial.length > 0){
      throw new UnauthorizedException('Quarto ja tem servico')
    }
    servicoEntidade.piscina = dados.piscina
    servicoEntidade.academiaPrivada = dados.academiaPrivada
    servicoEntidade.comidaQuarto = dados.comidaQuarto
    servicoEntidade.quarto = quarto

    await this.quartoRepository.save(quarto)
    const servicodoQuarto = await this.servicoRepository.save(servicoEntidade)
    return servicodoQuarto
  }
  async atualizarServicoEspecial(idHotel: string, idServico: string, dados: atualizaServico){
    const servico = await this.verificaServicoQuarto(idHotel, idServico)

    servico.academiaPrivada = dados.academiaPrivada
    servico.comidaQuarto = dados.comidaQuarto
    servico.piscina = dados.piscina

    const servicoAtualiza = await this.servicoRepository.save(servico)

    return {
      servicoAtualiza
    }
  }
  async deletarServico(idHotel: string, idServico: string){
    const servico = await this.verificaServicoQuarto(idHotel, idServico)

    await this.servicoRepository.delete(servico)

    return {
      servico
    }
  }
  
}
