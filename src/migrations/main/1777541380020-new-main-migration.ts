import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1777541380020 implements MigrationInterface {
    name = 'NewMainMigration1777541380020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "type" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "type" DROP NOT NULL`);
    }

}
