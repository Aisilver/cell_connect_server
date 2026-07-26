import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1785080393373 implements MigrationInterface {
    name = 'NewMainMigration1785080393373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cell-permissions" ADD "canPostAnnouncements" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cell-permissions" ADD "canViewAnalytics" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cell-permissions" ADD "meeting_hub_permissions" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cell-permissions" DROP COLUMN "meeting_hub_permissions"`);
        await queryRunner.query(`ALTER TABLE "cell-permissions" DROP COLUMN "canViewAnalytics"`);
        await queryRunner.query(`ALTER TABLE "cell-permissions" DROP COLUMN "canPostAnnouncements"`);
    }

}
