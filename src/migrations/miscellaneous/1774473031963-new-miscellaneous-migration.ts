import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1774473031963 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1774473031963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "lists" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lists" ALTER COLUMN "disabled" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lists" ALTER COLUMN "default" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" ALTER COLUMN "default" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lists" ALTER COLUMN "disabled" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "lists" ADD "name" character varying NOT NULL`);
    }

}
