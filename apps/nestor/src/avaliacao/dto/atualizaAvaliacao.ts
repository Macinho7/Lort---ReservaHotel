/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { criaAvaliacaoDTO } from './criaAvaliacao';

export class atualizaAvaliacao extends PartialType(criaAvaliacaoDTO) {}
