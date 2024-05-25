/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm'
import { UsuarioEntidade } from '../Entidades/usuario.entity';
import { HotelEntidade } from '../Entidades/hotel.entity';
import { ReservaEntidade } from '../Entidades/reserva.entity';
import { PagamentoEntidade } from '../Entidades/pagamento.entity';
import { QuartoEntidade } from '../Entidades/quarto.entity';
import { AvaliacaoEntidade } from '../Entidades/avaliacao.entity';
import { ServicoEspecialEntidade } from '../Entidades/servico-especial.entity';



const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [UsuarioEntidade, HotelEntidade, ReservaEntidade, PagamentoEntidade, QuartoEntidade,AvaliacaoEntidade, ServicoEspecialEntidade],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions)

export {dataSource}
