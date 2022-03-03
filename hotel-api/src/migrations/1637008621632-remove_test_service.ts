import {MigrationInterface, QueryRunner} from "typeorm";

export class removeTestService1637008621632 implements MigrationInterface {
    name = 'removeTestService1637008621632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" ADD "test" character varying NOT NULL`);
    }

}
