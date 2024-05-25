/* eslint-disable prettier/prettier */

import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, Length } from "class-validator";


export class atualizaUsuarioDTO {
  
    @IsNotEmpty()
    @Length(2, 20 , {message: 'Seu nome deve ser maior que 2 characteres ou menor que 20'})
    nome: string;
    @IsNotEmpty()
  
    @Exclude()
    @IsNotEmpty()
    senha: string;
  
    @IsNotEmpty()
    pais: string
  
    @IsNotEmpty()
    @IsNumber()
    idade: number
  
}
