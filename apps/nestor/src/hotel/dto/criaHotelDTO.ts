/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class criaHotelDTO {
  @IsUUID()
  id: string;

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
