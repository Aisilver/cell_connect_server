import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1776813738916 implements MigrationInterface {
    name = 'NewMainMigration1776813738916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meet-agendas" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "meet-agendas" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meet-agendas" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "meet-agendas" ADD "description" character varying NOT NULL`);
    }

}
