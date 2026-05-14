import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1778751542630 implements MigrationInterface {
    name = 'NewMainMigration1778751542630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "timezone" character varying NOT NULL DEFAULT 'Africa/Lagos'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timezone"`);
    }

}
