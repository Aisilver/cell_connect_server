import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1772487535271 implements MigrationInterface {
    name = 'NewMainMigration1772487535271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "lastUsed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "lastUsed"`);
    }

}
