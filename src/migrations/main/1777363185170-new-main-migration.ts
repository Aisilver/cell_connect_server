import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1777363185170 implements MigrationInterface {
    name = 'NewMainMigration1777363185170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "type" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "type" SET NOT NULL`);
    }

}
