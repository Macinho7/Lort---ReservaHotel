/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from 'class-validator';
enum StatusReserva {
    pendente = 'pendente',
    confirmada = 'confirmada',
    negada = 'negada'
}
export class CriaReservaDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  inicio: string;

  @IsNotEmpty()
  fim: string;

  @IsNotEmpty()
  status: StatusReserva;
}
