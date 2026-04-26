import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1776742688045 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1776742688045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jsons" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "key" character varying NOT NULL, "body" jsonb NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_20699f9a9435b2a937c93d48102" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b54ac07fdd2495c3fbb3fec234" ON "jsons" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b54ac07fdd2495c3fbb3fec234"`);
        await queryRunner.query(`DROP TABLE "jsons"`);
    }

}
