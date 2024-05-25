/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuartoEntidade } from "./quarto.entity";

enum Possibilidade {
    sim = 'sim',
    nao = 'nao'
}
@Entity({name: 'servicoEspecial'})
export class ServicoEspecialEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'comidaQuarto', nullable: false, type: 'enum', enum: Possibilidade, default: Possibilidade.nao})
    comidaQuarto: Possibilidade

    @Column({name: 'piscina', nullable: false, type: 'enum',enum: Possibilidade, default: Possibilidade.nao})
    piscina: Possibilidade

    @Column({name: 'academiaPrivada', nullable: false, type: 'enum',enum: Possibilidade, default: Possibilidade.nao})
    academiaPrivada: Possibilidade

    @ManyToOne(() => QuartoEntidade, (quarto) => quarto.servicoEspecial, {
        cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    quarto: QuartoEntidade
}
