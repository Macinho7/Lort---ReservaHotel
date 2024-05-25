/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntidade } from "./usuario.entity";



enum PagamentoCartao {
    cartao_credeb = 'credeb',
    teste1 = 'teste1',
    teste2 = 'teste2'
}
enum Pago {
    nao = 'nao',
    sim = 'sim',
    estornado = 'estornado'
}

@Entity({name: 'pagamento'})
export class PagamentoEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'pagamentoDoCartao', nullable: false, type: 'enum', enum: PagamentoCartao})
    pagamentoDoCartao: PagamentoCartao

    @Column({name: 'valor', nullable: false})
    valor: number

    @Column({name: 'Pago', nullable: false, type: 'enum', enum: Pago})
    Pago: Pago

    @Column({name: 'data_pagamento', nullable: false})
    data_pagamento: string

    @Column({name: 'usuario', nullable: false})
    usuarioPagamento: string

    @Column({name: 'idPagamentoSK', nullable: false})
    idPagamentoSK: string

    @Column({name: 'urlPayment', nullable: false})
    urlPayment: string

    @Column({name: 'idQuartoeSecret', nullable: false})
    idQuartoeSecret: string

    @Column({name: 'idReservaSecret', nullable: false})
    idReservaSecret: string

    @ManyToOne(() => UsuarioEntidade, (usuario) => usuario.pagamentos, {
        cascade: true,  onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    usuario: UsuarioEntidade

}
