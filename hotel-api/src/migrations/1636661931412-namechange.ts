import {MigrationInterface, QueryRunner} from "typeorm";

export class namechange1636661931412 implements MigrationInterface {
    name = 'namechange1636661931412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" RENAME COLUMN "nombre" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" RENAME COLUMN "name" TO "nombre"`);
    }

}
