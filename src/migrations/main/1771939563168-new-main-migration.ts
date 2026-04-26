import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1771939563168 implements MigrationInterface {
    name = 'NewMainMigration1771939563168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "bio" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "bio" SET NOT NULL`);
    }

}
