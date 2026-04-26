import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1773048494170 implements MigrationInterface {
    name = 'NewMainMigration1773048494170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "name" character varying NOT NULL`);
    }

}
