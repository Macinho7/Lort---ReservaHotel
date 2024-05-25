/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';
enum TamanhoQuarto {
    pequeno = 'pequeno',
    medio = 'medio', 
    grande = 'grande'
}
enum TipoCama {
    Solteiro = 'solteiro',
    Casal = 'casal'
}

export class criaQuartoDTO {
  @IsUUID()
  id: string;

  @Length(2, 20)
  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  cama: TipoCama;

  @IsNotEmpty()
  @IsNumber()
  preco: number;

  @IsNotEmpty()
  tamanho: TamanhoQuarto;
}
