/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
enum ClassificacaoQuarto {
    Zero = 0,
    Um = 1,
    Dois = 2,
    Tres = 3,
    Quatro = 4,
    Cinco = 5,
    Seis = 6,
    Sete = 7,
    Oito = 8,
    Nove = 9,
    Dez = 10
}
export class criaAvaliacaoDTO {
  @IsNotEmpty()
  classificacao: ClassificacaoQuarto

  @IsNotEmpty()
  comentario: string

  @IsNotEmpty()
  bom: string
  
  @IsNotEmpty()
  ruim: string
}
