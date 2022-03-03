import {MigrationInterface, QueryRunner} from "typeorm";

export class removeTest1636989275298 implements MigrationInterface {
    name = 'removeTest1636989275298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" ADD "test" character varying NOT NULL`);
    }

}
