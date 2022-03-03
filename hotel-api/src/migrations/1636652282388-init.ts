import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1636652282388 implements MigrationInterface {
  name = 'init1636652282388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "extraService" ("idExtraService" SERIAL NOT NULL, "nombre" character varying NOT NULL, "roomId" integer NOT NULL, CONSTRAINT "PK_2b64f4a2b0187645f01e43328eb" PRIMARY KEY ("idExtraService"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "picture" ("idPicture" SERIAL NOT NULL, "url" character varying NOT NULL, "roomId" integer NOT NULL, CONSTRAINT "PK_149aaa01537e4c4ff396228e206" PRIMARY KEY ("idPicture"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "history" ("idHistory" SERIAL NOT NULL, "checkIn_at" integer NOT NULL, "checkOut_at" integer NOT NULL, "idRoom" integer NOT NULL, "idClient" integer NOT NULL, "clientId" integer NOT NULL, "roomId" integer NOT NULL, CONSTRAINT "PK_60e0c72cc1f446b4373ac61343c" PRIMARY KEY ("idHistory"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "roomNumber" character varying NOT NULL, "empty" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL, "capacity" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "clientId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "document" integer NOT NULL, CONSTRAINT "UQ_463cae6774e9b085ca966d89b4f" UNIQUE ("document"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "extraService" ADD CONSTRAINT "FK_f4312e99d75bd57a059cc6d4802" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "picture" ADD CONSTRAINT "FK_be800b0e57489ef4a894f51f159" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_82a25a3a3cca8f81d3ee504950e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_ff4d207fa1da7942db5f630e360" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_50cd9c6237d7fe77a61ea48a333" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_50cd9c6237d7fe77a61ea48a333"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_ff4d207fa1da7942db5f630e360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_82a25a3a3cca8f81d3ee504950e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "picture" DROP CONSTRAINT "FK_be800b0e57489ef4a894f51f159"`,
    );
    await queryRunner.query(
      `ALTER TABLE "extraService" DROP CONSTRAINT "FK_f4312e99d75bd57a059cc6d4802"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "history"`);
    await queryRunner.query(`DROP TABLE "picture"`);
    await queryRunner.query(`DROP TABLE "extraService"`);
  }
}
