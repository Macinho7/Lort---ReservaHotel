/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HotelEntidade } from './hotel.entity';

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
@Entity({ name: 'avaliacao' })
export class AvaliacaoEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'enum', enum: ClassificacaoQuarto, nullable: false, default: ClassificacaoQuarto.Zero })
    classificacao: ClassificacaoQuarto

    @Column({name: 'comentario', nullable: false})
    comentario: string

    @Column({name: 'usuario', nullable: false})
    usuario: string

    @Column({name: 'idusuario', nullable: false})
    idusuario: string

    @Column({name: 'idHotel', nullable: false})
    idHotel: string
    
    @Column({name: 'data_avaliacao', nullable: false})
    data_avaliacao: string

    @Column({name: 'bom', nullable: false})
    bom: string

    @Column({name: 'ruim', nullable: false})
    ruim: string

    @ManyToOne(() => HotelEntidade, (hotel) => hotel.avaliacao, {
        cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    hotel: HotelEntidade
}
