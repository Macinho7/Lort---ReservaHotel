import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1715705958669 implements MigrationInterface {
    name = 'Table1715705958669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reserva" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "inicio" date NOT NULL, "fim" date NOT NULL, "idQuartoeSecret" character varying NOT NULL, "clientArrive" character varying NOT NULL DEFAULT 'nao', "status" "public"."reserva_status_enum" NOT NULL DEFAULT 'pendente', "usuarioId" uuid, CONSTRAINT "PK_37909c9a3ea6a72ee6f21b16129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pagamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "metodo_pagamento" "public"."pagamento_metodo_pagamento_enum" NOT NULL, "valor" integer NOT NULL, "StatusPago" "public"."pagamento_statuspago_enum" NOT NULL DEFAULT 'nao', "data_pagamento" character varying NOT NULL, "usuario" character varying NOT NULL, "idPagamentoSK" character varying NOT NULL, "urlPayment" character varying NOT NULL, "idQuartoeSecret" character varying NOT NULL, "idReservaSecret" character varying NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_ac81e75b741a26f350c5fb1ff20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "idade" integer NOT NULL, "pais" character varying NOT NULL, "aceitou_termos" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "servicoEspecial" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comidaQuarto" "public"."servicoEspecial_comidaquarto_enum" NOT NULL DEFAULT 'nao', "piscina" "public"."servicoEspecial_piscina_enum" NOT NULL DEFAULT 'nao', "academiaPrivada" "public"."servicoEspecial_academiaprivada_enum" NOT NULL DEFAULT 'nao', "quartoId" uuid, CONSTRAINT "PK_8e0ea9e2b7c8f0d7e7ef8c7c994" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quarto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" character varying NOT NULL, "cama" "public"."quarto_cama_enum" NOT NULL, "preco" integer NOT NULL, "disponivel" "public"."quarto_disponivel_enum" NOT NULL DEFAULT 'sim', "tamanho" "public"."quarto_tamanho_enum" NOT NULL, "hotelId" uuid, CONSTRAINT "PK_a56f78b918cea0531ff5e1f6094" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "avaliacao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "classificacao" "public"."avaliacao_classificacao_enum" NOT NULL DEFAULT '0', "comentario" character varying NOT NULL, "data_avaliacao" character varying NOT NULL, "bom" character varying NOT NULL, "ruim" character varying NOT NULL, "hotelId" uuid, CONSTRAINT "PK_fd3e156019eb4b68c6c9f746d51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "endereco" character varying NOT NULL, "descricao" character varying NOT NULL, "estrelas" integer NOT NULL, "avaliacao" integer NOT NULL DEFAULT '0', "tipo" character varying NOT NULL, CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserva" ADD CONSTRAINT "FK_b9efd119aa658b7553ef7667883" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pagamento" ADD CONSTRAINT "FK_477af253606c18821952e336a07" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "servicoEspecial" ADD CONSTRAINT "FK_d01b797db63254121a9e81fe0ff" FOREIGN KEY ("quartoId") REFERENCES "quarto"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "quarto" ADD CONSTRAINT "FK_8e2f11023bbd806a44f7041258a" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "avaliacao" ADD CONSTRAINT "FK_cefde79a3470e9dd86360c40ce0" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avaliacao" DROP CONSTRAINT "FK_cefde79a3470e9dd86360c40ce0"`);
        await queryRunner.query(`ALTER TABLE "quarto" DROP CONSTRAINT "FK_8e2f11023bbd806a44f7041258a"`);
        await queryRunner.query(`ALTER TABLE "servicoEspecial" DROP CONSTRAINT "FK_d01b797db63254121a9e81fe0ff"`);
        await queryRunner.query(`ALTER TABLE "pagamento" DROP CONSTRAINT "FK_477af253606c18821952e336a07"`);
        await queryRunner.query(`ALTER TABLE "reserva" DROP CONSTRAINT "FK_b9efd119aa658b7553ef7667883"`);
        await queryRunner.query(`DROP TABLE "hotel"`);
        await queryRunner.query(`DROP TABLE "avaliacao"`);
        await queryRunner.query(`DROP TABLE "quarto"`);
        await queryRunner.query(`DROP TABLE "servicoEspecial"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "pagamento"`);
        await queryRunner.query(`DROP TABLE "reserva"`);
    }

}
