import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1774054583451 implements MigrationInterface {
    name = 'NewMainMigration1774054583451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f75de36d0d30611d95d6247fd1"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "venueId" integer`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "UQ_09dcc0303d25357f994dd3d2643" UNIQUE ("venueId")`);
        await queryRunner.query(`ALTER TABLE "cells" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "cells" ADD CONSTRAINT "UQ_1f86d3d755e3f465d02c909a2e2" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_09dcc0303d25357f994dd3d2643" FOREIGN KEY ("venueId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cells" ADD CONSTRAINT "FK_1f86d3d755e3f465d02c909a2e2" FOREIGN KEY ("addressId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cells" DROP CONSTRAINT "FK_1f86d3d755e3f465d02c909a2e2"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_09dcc0303d25357f994dd3d2643"`);
        await queryRunner.query(`ALTER TABLE "cells" DROP CONSTRAINT "UQ_1f86d3d755e3f465d02c909a2e2"`);
        await queryRunner.query(`ALTER TABLE "cells" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "UQ_09dcc0303d25357f994dd3d2643"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "venueId"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_f75de36d0d30611d95d6247fd1" ON "location" ("type") `);
    }

}
