import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1777200579692 implements MigrationInterface {
    name = 'NewMainMigration1777200579692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meet-agendas" ADD "default" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meet-agendas" DROP COLUMN "default"`);
    }

}
