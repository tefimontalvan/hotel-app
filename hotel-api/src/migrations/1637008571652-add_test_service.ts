import {MigrationInterface, QueryRunner} from "typeorm";

export class addTestService1637008571652 implements MigrationInterface {
    name = 'addTestService1637008571652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" DROP COLUMN "test"`);
    }

}
