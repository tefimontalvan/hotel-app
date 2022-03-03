import {MigrationInterface, QueryRunner} from "typeorm";

export class removeTestColumnUser1637160117110 implements MigrationInterface {
    name = 'removeTestColumnUser1637160117110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying NOT NULL`);
    }

}
