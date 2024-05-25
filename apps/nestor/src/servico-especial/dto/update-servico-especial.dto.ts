/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { criaServicoEspecial } from './criaServico';

export class atualizaServico extends PartialType(criaServicoEspecial) {}
