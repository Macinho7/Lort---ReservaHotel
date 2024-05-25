/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntidade } from './Entidades/usuario.entity';
import { Repository } from 'typeorm';
import { CriaUsuario } from './Dto/UsuarioDTO';
import * as bcrypt from 'bcrypt'
import { atualizaUsuarioDTO } from './Dto/AtualizaUsuarioDTO';
import { verificarFraseProibida } from './arrayF/arrayDasPalavras';
@Injectable()
export class NestorService {
  constructor(
    @InjectRepository(UsuarioEntidade)
    private readonly usuarioRepository: Repository<UsuarioEntidade>
  ){}

  async validarEmail(email: string){
    const servicosEmail = [
      '@gmail',
      '@hotmail',
      '@protonmail',
      '@yahoo',
      '@icloud',
      '@aol',
      '@zoho',
      '@yandex',
      '@gmx',
      '@mail',
      '@tutanota',
      '@fastmail',
      '@mailfence',
      '@hushmail'
    ]
    const key = '@'
    const contaiKey = email.includes(key)
    if(!contaiKey){
      throw new UnauthorizedException('Email nao contem chave para servicos email: @')
    }
    const verificarEmail = servicosEmail.some((servico) => email.includes(servico))
    if(!verificarEmail){
      throw new UnauthorizedException('Servico de email invalido')
    }else{
      return email
    }
  }
  async verificaSenhaForte(senha: string){
    const temNumero = /\d/;
    const temLetraMinuscula = /[a-z]/;
    const temLetraMaiuscula = /[A-Z]/;
    const tamanhoSenha = senha.length

    if(!temNumero.test(senha) || !temLetraMaiuscula.test(senha) || !temLetraMinuscula.test(senha) || tamanhoSenha < 5){
      throw new UnauthorizedException(`Sua senha: ${senha} precisa de pelo menos 5 caracteres, uma letra maiscula, minuscula e numero`)
    }else{
      return senha
    }
  }
  async verificarNomeExiste(nome: string){
    const usuarioNome = await this.usuarioRepository.findOne({where: {nome: nome}})
    if(usuarioNome){
      throw new UnauthorizedException(`usuario: ${nome} existente`)
    }else{
      return {
        nome
      }
    }
  }
  async verificarEmailExiste(email: string){
      const usuarioemail = await this.usuarioRepository.findOne({where: {email: email}})
      if(usuarioemail){
        throw new UnauthorizedException(`usuario: ${email} existente`)
      }else{
        return {
          email
        }
      }
  }
  async hashearSenha(senha: string){
    
    const sal = await bcrypt.genSalt(12)

    const senhaHash = await bcrypt.hash(senha, sal)

    return senhaHash
  }
  async criaUsuario(dados: CriaUsuario){
    const usuarioEntidade = new UsuarioEntidade()
    usuarioEntidade.id = dados.id
    await verificarFraseProibida(dados.pais)
    await verificarFraseProibida(dados.email)
    await verificarFraseProibida(dados.senha)
    await verificarFraseProibida(dados.nome)
    usuarioEntidade.nome = dados.nome
    usuarioEntidade.email = dados.email
    await this.validarEmail(dados.email)
    usuarioEntidade.pais = dados.pais
    await this.verificaSenhaForte(dados.senha)
    usuarioEntidade.senha = dados.senha
    const senhaHashead = await this.hashearSenha(dados.senha)
    usuarioEntidade.senha = senhaHashead
    usuarioEntidade.idade = dados.idade
    await this.verificarNomeExiste(dados.nome)
    await this.verificarEmailExiste(dados.email)
    if(usuarioEntidade.idade < 18 || usuarioEntidade.idade > 100){
      throw new UnauthorizedException('Idade invalida!')
    }
    usuarioEntidade.aceitouTermos = dados.aceitouTermos
    if(usuarioEntidade.aceitouTermos === false){
      throw new UnauthorizedException('Voce deve aceitar os termos e condicoes!')
    }

    const usuarioCriado = await this.usuarioRepository.save(usuarioEntidade)
    return usuarioCriado
  }

  async atualizaUsuario(idCriador: string, idUsuarioAtualizar: string, dados: atualizaUsuarioDTO){
    const usuario = await this.usuarioRepository.findOne({where: {id: idCriador}})
    if(usuario === null){
      throw new UnauthorizedException('Usuario Criador  nao existe')
    }
    const usuarioParaAtualizar = await this.usuarioRepository.findOne({where: {id: idUsuarioAtualizar}})
    if(usuarioParaAtualizar === null){
      throw new UnauthorizedException('Usuario nao existe')
    }
    if(usuarioParaAtualizar.deleted === true){
      throw new BadRequestException('Usuario foi deletado')
    }
    if(usuario.id !== usuarioParaAtualizar.id){
      throw new UnauthorizedException(`Usuario: ${usuario.nome} voce nao pode fazer isso`)
    }
    
    usuarioParaAtualizar.nome = dados.nome
    await verificarFraseProibida(dados.nome)
    await verificarFraseProibida(dados.pais)
    await verificarFraseProibida(dados.senha)
    await this.verificarNomeExiste(dados.nome)
    usuarioParaAtualizar.idade = dados.idade
    if(usuarioParaAtualizar.idade < 18 || usuarioParaAtualizar.idade > 130){
      throw new UnauthorizedException('Idade invalida!')
    }
    await this.verificaSenhaForte(dados.senha)
    usuarioParaAtualizar.senha = dados.senha
    const senhaHashead = await this.hashearSenha(dados.senha)
    usuarioParaAtualizar.senha = senhaHashead
    usuarioParaAtualizar.pais = dados.pais

    const usuarioAtualizado = await this.usuarioRepository.save(usuarioParaAtualizar)
    return {
      Message: 'Usuario Atualizado',
      Usuario: usuarioAtualizado
    }
    
  }

  async listarUsuarios(){
    const usuarios =  await this.usuarioRepository.find()
    const usuariosFiltrados = usuarios.filter((usuario) => usuario.deleted === false)

    return usuariosFiltrados
  }

  async listarUsuario(id: string){
    const usuario = await this.usuarioRepository.findOneBy({id})
    if(usuario === null){
      throw new UnauthorizedException('Usuario nao existe')
    }
    if(usuario.deleted === true){
      throw new UnauthorizedException('Usuario foi deletado')
    }

    return usuario
  }

  async deletarUsuario(id: string){
    const usuario = await this.usuarioRepository.findOneBy({id})

    if(usuario.deleted === true){
      throw new UnauthorizedException('Usuario ja foi deletado')
    } else if(usuario.deleted === false) {
      usuario.deleted = true
      const usuarioR = await this.usuarioRepository.save(usuario)
      return usuarioR
    }
  }
  async restorarUsuario(idUsuarioDeletado: string){
    const usuario = await this.usuarioRepository.findOne({where: {id: idUsuarioDeletado}})
    if(usuario === null){
      throw new UnauthorizedException('Usuario nao existe')
    }

    if(usuario.deleted === false){
      throw new UnauthorizedException('Usuario nao foi deletado')
    } else if(usuario.deleted === true){
      usuario.deleted = false
      const usuarioR = await this.usuarioRepository.save(usuario)

      return {
        Message: 'Usuario foi restorado',
        Usuario: usuarioR
      }
    }
  }
  async pegaUsuarioDeletados(){
    const usuarios =  await this.usuarioRepository.find()
    const usuariosFiltrados = usuarios.filter((usuario) => usuario.deleted === true)

    return usuariosFiltrados
  }
}
