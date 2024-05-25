/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuartoEntidade } from "./quarto.entity";
import { AvaliacaoEntidade } from "./avaliacao.entity";

@Entity('hotel')
export class HotelEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: false, name: 'nome'})
    nome: string

    @Column({nullable: false, name: 'endereco'})
    endereco: string

    @Column({nullable: false, name: 'descricao'})
    descricao: string

    @Column({nullable: false, name: 'estrelas'})
    estrelas: number 

    @Column({ name: 'avaliacao', nullable: false, default: 0, type: 'numeric', precision: 3, scale: 1 })
    avaliacaoHotel: number;

    @Column({nullable: false, name: 'tipo'})
    tipo: string

    @OneToMany(() => QuartoEntidade, (quarto) => quarto.hotel, {
        eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    quarto: QuartoEntidade[]

    @OneToMany(() => AvaliacaoEntidade, (avaliacao) => avaliacao.hotel, {
        eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    avaliacao: AvaliacaoEntidade[]
}
