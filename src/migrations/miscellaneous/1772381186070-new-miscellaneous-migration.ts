import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1772381186070 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1772381186070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_historys" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_479f95b0e1624798a88e25dfb92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "slides" ALTER COLUMN "media_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slides" ALTER COLUMN "media_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`DROP TABLE "password_historys"`);
    }

}
