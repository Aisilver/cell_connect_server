import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1778544958238 implements MigrationInterface {
    name = 'NewMainMigration1778544958238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_e6fd46d79ca51ad99b6ba42acea"`);
        await queryRunner.query(`ALTER TABLE "members" RENAME COLUMN "cell_id" TO "cellId"`);
        await queryRunner.query(`ALTER TABLE "leaders" DROP COLUMN "cell_id"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "default" boolean`);
        await queryRunner.query(`ALTER TABLE "meeting-edit-logs" ADD "type_changed" boolean`);
        await queryRunner.query(`ALTER TABLE "members" ALTER COLUMN "cellId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_f0b4807792c374507cfba8677cc" FOREIGN KEY ("cellId") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_f0b4807792c374507cfba8677cc"`);
        await queryRunner.query(`ALTER TABLE "members" ALTER COLUMN "cellId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meeting-edit-logs" DROP COLUMN "type_changed"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "default"`);
        await queryRunner.query(`ALTER TABLE "leaders" ADD "cell_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" RENAME COLUMN "cellId" TO "cell_id"`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_e6fd46d79ca51ad99b6ba42acea" FOREIGN KEY ("cell_id") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
