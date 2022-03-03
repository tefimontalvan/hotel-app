import {MigrationInterface, QueryRunner} from "typeorm";

export class manytomanyJoincolumn1636720700959 implements MigrationInterface {
    name = 'manytomanyJoincolumn1636720700959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extraService" RENAME COLUMN "idExtraService" TO "id"`);
        await queryRunner.query(`ALTER TABLE "extraService" RENAME CONSTRAINT "PK_2b64f4a2b0187645f01e43328eb" TO "PK_d3caf5b559af45b187c93f32cd5"`);
        await queryRunner.query(`ALTER SEQUENCE "extraService_idExtraService_seq" RENAME TO "extraService_id_seq"`);
        await queryRunner.query(`CREATE TABLE "room_service_id" ("room" integer NOT NULL, "extraService" integer NOT NULL, CONSTRAINT "PK_9f37fd42d638f8b58b7d183c84d" PRIMARY KEY ("room", "extraService"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea265599ea77a07595b51c881f" ON "room_service_id" ("room") `);
        await queryRunner.query(`CREATE INDEX "IDX_07798f35f4d023a98c8064d258" ON "room_service_id" ("extraService") `);
        await queryRunner.query(`ALTER TABLE "room_service_id" ADD CONSTRAINT "FK_ea265599ea77a07595b51c881f6" FOREIGN KEY ("room") REFERENCES "extraService"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_service_id" ADD CONSTRAINT "FK_07798f35f4d023a98c8064d2589" FOREIGN KEY ("extraService") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_service_id" DROP CONSTRAINT "FK_07798f35f4d023a98c8064d2589"`);
        await queryRunner.query(`ALTER TABLE "room_service_id" DROP CONSTRAINT "FK_ea265599ea77a07595b51c881f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07798f35f4d023a98c8064d258"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea265599ea77a07595b51c881f"`);
        await queryRunner.query(`DROP TABLE "room_service_id"`);
        await queryRunner.query(`ALTER SEQUENCE "extraService_id_seq" RENAME TO "extraService_idExtraService_seq"`);
        await queryRunner.query(`ALTER TABLE "extraService" RENAME CONSTRAINT "PK_d3caf5b559af45b187c93f32cd5" TO "PK_2b64f4a2b0187645f01e43328eb"`);
        await queryRunner.query(`ALTER TABLE "extraService" RENAME COLUMN "id" TO "idExtraService"`);
    }

}
