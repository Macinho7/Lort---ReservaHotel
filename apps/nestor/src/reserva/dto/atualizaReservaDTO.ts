/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";


export class atualizaReservaDTO {
  
    @IsNotEmpty()
    inicio: string;
  
    @IsNotEmpty()
    fim: string;
  
}
