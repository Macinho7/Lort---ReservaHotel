/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ReservaEntidade } from './reserva.entity';
import { PagamentoEntidade } from './pagamento.entity';

@Entity({name: 'usuario'})
export class UsuarioEntidade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "nome", nullable: false})
    nome: string

    @Column({name: "email", nullable: false})
    email: string
    
    @Column({name: "senha", nullable: false})
    senha: string

    @Column({name: "idade", nullable: false})
    idade: number

    @Column({name: "pais", nullable: false})
    pais: string

    @Column({ name: "aceitou_termos", nullable: false, default: false })
    aceitouTermos: boolean;

    @Column({name: "deleted", nullable: false, default: false})
    deleted: boolean

    @OneToMany(() => ReservaEntidade, (reserva) =>  reserva.usuario, {
        eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    reserva: ReservaEntidade[]

    @OneToMany(() => PagamentoEntidade, (pagamento) => pagamento.usuario, {
        eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    pagamentos: PagamentoEntidade[]

}