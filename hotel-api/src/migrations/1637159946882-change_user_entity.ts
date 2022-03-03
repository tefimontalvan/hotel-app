import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserEntity1637159946882 implements MigrationInterface {
    name = 'changeUserEntity1637159946882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

}
