import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1778782012244 implements MigrationInterface {
    name = 'NewMainMigration1778782012244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "timezone" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "timezone" SET DEFAULT 'Africa/Lagos'`);
    }

}
