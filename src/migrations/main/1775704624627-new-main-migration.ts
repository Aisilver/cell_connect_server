import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1775704624627 implements MigrationInterface {
    name = 'NewMainMigration1775704624627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "endTime" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "endTime" DROP NOT NULL`);
    }

}
