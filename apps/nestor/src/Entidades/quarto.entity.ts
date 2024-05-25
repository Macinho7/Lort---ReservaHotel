/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HotelEntidade } from "./hotel.entity";
import { ServicoEspecialEntidade } from "./servico-especial.entity";

enum TipoCama {
    Solteiro = 'solteiro',
    Casal = 'casal'
}

enum QuartoDisponivel {
    sim = 'sim',
    nao = 'nao'
}

enum TamanhoQuarto {
    pequeno = 'pequeno',
    medio = 'medio', 
    grande = 'grande'
}
@Entity({name: 'quarto'})
export class QuartoEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'tipo', nullable: false})
    tipo: string

    @Column({type: 'enum', name: 'cama' , enum: TipoCama})
    cama: TipoCama

    @Column({name: 'preco', nullable: false})
    preco: number

    @Column({type: 'enum', name: 'disponivel', enum: QuartoDisponivel, default: QuartoDisponivel.sim})
    disponivel: QuartoDisponivel

    @Column({type: 'enum', name: 'tamanho', enum: TamanhoQuarto})
    tamanho: TamanhoQuarto


    @ManyToOne(() => HotelEntidade, (hotel) => hotel.quarto, {
        cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    hotel: HotelEntidade

    @OneToMany(() => ServicoEspecialEntidade, (servico) => servico.quarto, {
        eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    servicoEspecial: ServicoEspecialEntidade[]
}
