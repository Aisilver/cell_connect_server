import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1771928008543 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1771928008543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "slides" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "message" character varying, "media_id" integer, "subtitle" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_7907bb06ab78980c123912f7a7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca27b3586d1fcf26af1215807a" ON "slides" ("type") `);
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "disabled" boolean NOT NULL, "default" boolean NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "socials" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "type" character varying NOT NULL, "link" character varying NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e3ee018e1b66c619ae3d3b3309" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "socials"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca27b3586d1fcf26af1215807a"`);
        await queryRunner.query(`DROP TABLE "slides"`);
    }

}
