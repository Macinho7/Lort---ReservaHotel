/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';

export class CriaUsuario {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @Length(2, 20 , {message: 'Seu nome deve ser maior que 2 characteres ou menor que 20'})
  nome: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  pais: string

  @IsNotEmpty()
  @IsNumber()
  idade: number

  @IsNotEmpty()
  aceitouTermos: boolean;
}
