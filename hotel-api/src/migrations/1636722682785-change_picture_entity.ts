import {MigrationInterface, QueryRunner} from "typeorm";

export class changePictureEntity1636722682785 implements MigrationInterface {
    name = 'changePictureEntity1636722682785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "PK_149aaa01537e4c4ff396228e206"`);
        await queryRunner.query(`ALTER TABLE "picture" DROP COLUMN "idPicture"`);
        await queryRunner.query(`ALTER TABLE "picture" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_be800b0e57489ef4a894f51f159"`);
        await queryRunner.query(`ALTER TABLE "picture" ALTER COLUMN "roomId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_be800b0e57489ef4a894f51f159" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "FK_be800b0e57489ef4a894f51f159"`);
        await queryRunner.query(`ALTER TABLE "picture" ALTER COLUMN "roomId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "FK_be800b0e57489ef4a894f51f159" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "picture" DROP CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38"`);
        await queryRunner.query(`ALTER TABLE "picture" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "picture" ADD "idPicture" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "picture" ADD CONSTRAINT "PK_149aaa01537e4c4ff396228e206" PRIMARY KEY ("idPicture")`);
    }

}
