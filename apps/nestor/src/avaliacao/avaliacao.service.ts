/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { AcharMetodos } from '../metodosDeProcura/acharMetodos';
import { criaAvaliacaoDTO } from './dto/criaAvaliacao';
import { randomUUID } from 'crypto';
import { AvaliacaoEntidade } from '../Entidades/avaliacao.entity';
import { atualizaAvaliacao } from './dto/atualizaAvaliacao';


@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(UsuarioEntidade)
    private readonly usuarioRepository:Repository<UsuarioEntidade>,
    @InjectRepository(HotelEntidade)
    private readonly hotelRepository:Repository<HotelEntidade>,
    @InjectRepository(AvaliacaoEntidade)
    private readonly avaliacaoRepository:Repository<AvaliacaoEntidade>,
    private readonly metodosAcharId: AcharMetodos
    
  ){}
  
  async criaAvaliacaoParoHotel(idUsuario: string, idHotel: string, dados: criaAvaliacaoDTO ){
    try{
      const usuario = await this.metodosAcharId.acharUsuario(idUsuario)
      const hotel = await this.metodosAcharId.acharHotel(idHotel)

      const avaliacaoEntidade = new AvaliacaoEntidade()
      const dataS = new Date()
      dataS.setUTCHours(dataS.getUTCHours() - 3)
      const dataBRA = dataS.toISOString()
      console.log(dados.comentario)
      avaliacaoEntidade.id = randomUUID()
      avaliacaoEntidade.usuario = usuario.nome
      avaliacaoEntidade.comentario = dados.comentario
      avaliacaoEntidade.hotel = hotel
      avaliacaoEntidade.bom = dados.bom
      avaliacaoEntidade.ruim = dados.ruim
      avaliacaoEntidade.data_avaliacao = dataBRA
      avaliacaoEntidade.idusuario = usuario.id
      avaliacaoEntidade.idHotel = hotel.id
      avaliacaoEntidade.classificacao = dados.classificacao

      if(dados.classificacao < 0 || dados.classificacao > 10){
        throw new UnauthorizedException('Dados Indisponiveis')
      }
     
      let valoresTotais = 0
      for(let i = 0; i < hotel.avaliacao.length; i++){
        valoresTotais += hotel.avaliacao[i].classificacao 
        const usuarios = hotel.avaliacao[i].idusuario
        if(usuario.id === usuarios) {
          throw new UnauthorizedException("Voce ja fez sua avaliacao")
        }
      }
      const numerosSecretos = hotel.avaliacao.length + 1
      valoresTotais += dados.classificacao
      const valoresParaBanco = valoresTotais / numerosSecretos
      hotel.avaliacaoHotel = valoresParaBanco

      if(hotel.avaliacaoHotel > 10.0){
        hotel.avaliacaoHotel = 10.0
      }
      if(hotel.avaliacaoHotel < 0.0){
        hotel.avaliacaoHotel = 0.0
      }
      await this.hotelRepository.save(hotel)
      await this.usuarioRepository.save(usuario)
      const avaliacaoS = await this.avaliacaoRepository.save(avaliacaoEntidade)
      return avaliacaoS
    } catch(Error){
      console.log(Error)
    }
  }
  async deletarAvaliacao(idUsuario: string, idAvaliacao: string, idHotel: string){
    try{
      const usuario = await this.metodosAcharId.acharUsuario(idUsuario)
      const avaliacao = await this.metodosAcharId.acharAvaliacao(idAvaliacao)
      const hotel = await this.metodosAcharId.acharHotel(idHotel)
      let valoresTotais = 0
      if(avaliacao.idusuario !== usuario.id){
        throw new UnauthorizedException("Voce nao e criou esse avaliacao")
      }
      if(avaliacao.idHotel !== hotel.id){
        throw new UnauthorizedException("Hotel nao possui essa avaliacao")
      }
      const numerosS = hotel.avaliacao.length - 1
      for(let i = 0; i < hotel.avaliacao.length; i++){
        valoresTotais += hotel.avaliacao[i].classificacao
      }
      valoresTotais -= avaliacao.classificacao
      const numeroParaHotel = valoresTotais / numerosS
      hotel.avaliacaoHotel = numeroParaHotel

      
      if(Number.isNaN(hotel.avaliacaoHotel)){
        hotel.avaliacaoHotel = 0.0
      }
      
      await this.hotelRepository.save(hotel)
      await this.usuarioRepository.save(usuario)
      const avaliacaoDel = await this.avaliacaoRepository.remove(avaliacao)

      return avaliacaoDel
    }catch(Error){
      console.log(Error)
    }
  }
  async atualizarAvaliacao(idUsuario: string, idAvaliacao: string, dados: atualizaAvaliacao){
    const usuario = await this.metodosAcharId.acharUsuario(idUsuario)
    const avaliacao = await this.metodosAcharId.acharAvaliacao(idAvaliacao)

    const hotel = await this.metodosAcharId.acharHotel(avaliacao.idHotel)
    if(avaliacao.idusuario !== usuario.id){
      throw new UnauthorizedException("Voce nao e criou esse avaliacao")
    }
    avaliacao.bom = dados.bom
    avaliacao.ruim = dados.ruim
    avaliacao.comentario = dados.comentario
    avaliacao.classificacao = dados.classificacao
    avaliacao.hotel = hotel
    
    const avaliacaoDoArray = hotel.avaliacao.find((achou) => achou.id === avaliacao.id)
    if(avaliacaoDoArray === null){
      throw new UnauthorizedException('Avaliacao inexistente')
    }
    if(dados.classificacao < 0 || dados.classificacao > 10){
      throw new UnauthorizedException('Dados Indisponiveis')
    }
    avaliacaoDoArray.classificacao = dados.classificacao
    let valoresTotais = 0
    const numerosS = hotel.avaliacao.length

    for(let i = 0; i < hotel.avaliacao.length; i++){
      valoresTotais += hotel.avaliacao[i].classificacao
    }
    
    const numeroParaHotel = valoresTotais / numerosS
    hotel.avaliacaoHotel = numeroParaHotel
    await this.hotelRepository.save(hotel)
    await this.usuarioRepository.save(usuario)

    const avaliacaoM = await this.avaliacaoRepository.save(avaliacao)
    return avaliacaoM
  }
  async avaliacoesDoHotel(idHotel: string){
    const hotel = await this.metodosAcharId.acharHotel(idHotel)
    const avaliacoesDoHotel = hotel.avaliacao

    return {
      "Avaliacoes": avaliacoesDoHotel
    }
  }

}
