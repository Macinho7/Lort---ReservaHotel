/* eslint-disable prettier/prettier */

import { IsNotEmpty, Length } from "class-validator";


export class atualizaHotelDTO  {

  @Length(2, 50)
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  estrelas: number;

  @Length(2, 50)
  @IsNotEmpty()
  tipo: string;
}
