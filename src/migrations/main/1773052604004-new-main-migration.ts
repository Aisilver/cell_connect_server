import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1773052604004 implements MigrationInterface {
    name = 'NewMainMigration1773052604004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9"`);
    }

}
