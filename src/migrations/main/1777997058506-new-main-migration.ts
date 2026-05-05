import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1777997058506 implements MigrationInterface {
    name = 'NewMainMigration1777997058506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cells" DROP CONSTRAINT "FK_1f86d3d755e3f465d02c909a2e2"`);
        await queryRunner.query(`ALTER TABLE "cells" RENAME COLUMN "addressId" TO "defaultVenueId"`);
        await queryRunner.query(`ALTER TABLE "cells" RENAME CONSTRAINT "UQ_1f86d3d755e3f465d02c909a2e2" TO "UQ_efbb73fb6ab74c573fbe1a5eb90"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "landmark" character varying`);
        await queryRunner.query(`ALTER TABLE "location" ADD "type" character varying NOT NULL DEFAULT 'user-location'`);
        await queryRunner.query(`CREATE INDEX "IDX_f75de36d0d30611d95d6247fd1" ON "location" ("type") `);
        await queryRunner.query(`ALTER TABLE "cells" ADD CONSTRAINT "FK_efbb73fb6ab74c573fbe1a5eb90" FOREIGN KEY ("defaultVenueId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cells" DROP CONSTRAINT "FK_efbb73fb6ab74c573fbe1a5eb90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f75de36d0d30611d95d6247fd1"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "landmark"`);
        await queryRunner.query(`ALTER TABLE "cells" RENAME CONSTRAINT "UQ_efbb73fb6ab74c573fbe1a5eb90" TO "UQ_1f86d3d755e3f465d02c909a2e2"`);
        await queryRunner.query(`ALTER TABLE "cells" RENAME COLUMN "defaultVenueId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "cells" ADD CONSTRAINT "FK_1f86d3d755e3f465d02c909a2e2" FOREIGN KEY ("addressId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
