import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1773918313386 implements MigrationInterface {
    name = 'NewMainMigration1773918313386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ALTER COLUMN "arrivalTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" ALTER COLUMN "arrivalTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "status"`);
    }

}
