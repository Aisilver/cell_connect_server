import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1774473022536 implements MigrationInterface {
    name = 'NewMainMigration1774473022536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "type"`);
    }

}
