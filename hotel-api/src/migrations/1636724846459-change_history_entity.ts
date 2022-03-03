import {MigrationInterface, QueryRunner} from "typeorm";

export class changeHistoryEntity1636724846459 implements MigrationInterface {
    name = 'changeHistoryEntity1636724846459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "checkIn_at"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "checkIn_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "checkOut_at"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "checkOut_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "checkOut_at"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "checkOut_at" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "checkIn_at"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "checkIn_at" integer NOT NULL`);
    }

}
