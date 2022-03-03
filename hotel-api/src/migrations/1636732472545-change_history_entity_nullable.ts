import {MigrationInterface, QueryRunner} from "typeorm";

export class changeHistoryEntityNullable1636732472545 implements MigrationInterface {
    name = 'changeHistoryEntityNullable1636732472545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_82a25a3a3cca8f81d3ee504950e"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_ff4d207fa1da7942db5f630e360"`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "clientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "roomId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_82a25a3a3cca8f81d3ee504950e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_ff4d207fa1da7942db5f630e360" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_ff4d207fa1da7942db5f630e360"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_82a25a3a3cca8f81d3ee504950e"`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "roomId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "clientId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_ff4d207fa1da7942db5f630e360" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_82a25a3a3cca8f81d3ee504950e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
