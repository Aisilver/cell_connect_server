import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1776045442525 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1776045442525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app-settings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "setting_key" character varying NOT NULL, "setting_json" jsonb NOT NULL, CONSTRAINT "PK_43e8a568956e2bedcfbb86bb5ef" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "app-settings"`);
    }

}
