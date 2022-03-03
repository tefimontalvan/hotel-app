import {MigrationInterface, QueryRunner} from "typeorm";

export class changeHistoryEntity1636723610008 implements MigrationInterface {
    name = 'changeHistoryEntity1636723610008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "PK_60e0c72cc1f446b4373ac61343c"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "idHistory"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "idRoom"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "idClient"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "PK_9384942edf4804b38ca0ee51416"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "idClient" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD "idRoom" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD "idHistory" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "PK_60e0c72cc1f446b4373ac61343c" PRIMARY KEY ("idHistory")`);
    }

}
