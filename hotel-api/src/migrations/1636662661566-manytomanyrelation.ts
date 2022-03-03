import {MigrationInterface, QueryRunner} from "typeorm";

export class manytomanyrelation1636662661566 implements MigrationInterface {
    name = 'manytomanyrelation1636662661566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" DROP CONSTRAINT "FK_f4312e99d75bd57a059cc6d4802"`);
        await queryRunner.query(`ALTER TABLE "extraService" DROP COLUMN "roomId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" ADD "roomId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "extraService" ADD CONSTRAINT "FK_f4312e99d75bd57a059cc6d4802" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
