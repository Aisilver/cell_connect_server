import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1779090009863 implements MigrationInterface {
    name = 'NewMainMigration1779090009863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ADD "actualStartTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "actualEndTime" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "actualEndTime"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "actualStartTime"`);
    }

}
