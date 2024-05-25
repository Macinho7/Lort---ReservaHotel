/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntidade } from "./usuario.entity";
enum clientChegou {
    sim = 'sim',
    nao = 'nao'
}
enum Reserva {
    pendente = 'pendente',
    confirmada = 'confirmada',
    estornado = 'estornado',
    negada = 'negada'
}
@Entity({name: 'reserva'})
export class ReservaEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'inicio', type: 'date', nullable: false })
    inicio: string;

    @Column({name: 'fim', type: 'date',nullable: false })
    fim: string;

    @Column({name: 'idQuartoeSecret', nullable: false})
    idQuartoeSecret: string

    @Column({name: 'clientArrive', type: 'enum', enum: clientChegou, default: clientChegou.nao})
    clientArrive: clientChegou

    @Column({name: 'Reserva', type: 'enum', enum: Reserva })
    Reserva: Reserva;

    @ManyToOne(() => UsuarioEntidade, (usuario) => usuario.reserva, {
        cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    usuario: UsuarioEntidade


}
