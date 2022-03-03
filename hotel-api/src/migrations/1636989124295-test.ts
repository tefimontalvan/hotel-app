import {MigrationInterface, QueryRunner} from "typeorm";

export class test1636989124295 implements MigrationInterface {
    name = 'test1636989124295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" DROP COLUMN "test"`);
    }

}
