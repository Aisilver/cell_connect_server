import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1778228263069 implements MigrationInterface {
    name = 'NewMainMigration1778228263069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cell-permissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "meeting_permissions" jsonb NOT NULL, "member_permissions" jsonb NOT NULL, CONSTRAINT "PK_d36813523b928e26fc9c3db1a72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suspension" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "active" boolean NOT NULL, "endDate" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "description" text, "type" character varying NOT NULL, "suspenderId" integer, "memberId" integer, "cellId" integer, "accountId" integer, CONSTRAINT "PK_b46f45ab12700f920ef9237a967" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_804a07255f768bcd2441a27a7c" ON "suspension" ("type") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "new"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "suspended"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "new" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "status" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "suspensionId" integer`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_c76705242ef370a7b16e6cdf542" UNIQUE ("suspensionId")`);
        await queryRunner.query(`ALTER TABLE "leaders" ADD "cellPermissionId" integer`);
        await queryRunner.query(`ALTER TABLE "leaders" ADD CONSTRAINT "UQ_9415db0846c7a3dd96ed873c631" UNIQUE ("cellPermissionId")`);
        await queryRunner.query(`ALTER TABLE "cells" ADD "suspensionId" integer`);
        await queryRunner.query(`ALTER TABLE "cells" ADD CONSTRAINT "UQ_8f6c4001fbc47552abaee1d408a" UNIQUE ("suspensionId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "roles" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "members" ADD "cellPermissionId" integer`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_e226086369e95f42b48e32b8989" UNIQUE ("cellPermissionId")`);
        await queryRunner.query(`ALTER TABLE "members" ADD "suspensionId" integer`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "UQ_54fb63e36830776554d603e3f86" UNIQUE ("suspensionId")`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_c76705242ef370a7b16e6cdf542" FOREIGN KEY ("suspensionId") REFERENCES "suspension"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaders" ADD CONSTRAINT "FK_9415db0846c7a3dd96ed873c631" FOREIGN KEY ("cellPermissionId") REFERENCES "cell-permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cells" ADD CONSTRAINT "FK_8f6c4001fbc47552abaee1d408a" FOREIGN KEY ("suspensionId") REFERENCES "suspension"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_e226086369e95f42b48e32b8989" FOREIGN KEY ("cellPermissionId") REFERENCES "cell-permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_54fb63e36830776554d603e3f86" FOREIGN KEY ("suspensionId") REFERENCES "suspension"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suspension" ADD CONSTRAINT "FK_2fb8b814c328eb0de6dcec439ce" FOREIGN KEY ("suspenderId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suspension" ADD CONSTRAINT "FK_e3fc77bd6d60c67bdc4fc981019" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suspension" ADD CONSTRAINT "FK_c94f35575cbe2c3188f5bfc82bf" FOREIGN KEY ("cellId") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suspension" ADD CONSTRAINT "FK_05d05d935c1784bad2bbac5758e" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suspension" DROP CONSTRAINT "FK_05d05d935c1784bad2bbac5758e"`);
        await queryRunner.query(`ALTER TABLE "suspension" DROP CONSTRAINT "FK_c94f35575cbe2c3188f5bfc82bf"`);
        await queryRunner.query(`ALTER TABLE "suspension" DROP CONSTRAINT "FK_e3fc77bd6d60c67bdc4fc981019"`);
        await queryRunner.query(`ALTER TABLE "suspension" DROP CONSTRAINT "FK_2fb8b814c328eb0de6dcec439ce"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_54fb63e36830776554d603e3f86"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_e226086369e95f42b48e32b8989"`);
        await queryRunner.query(`ALTER TABLE "cells" DROP CONSTRAINT "FK_8f6c4001fbc47552abaee1d408a"`);
        await queryRunner.query(`ALTER TABLE "leaders" DROP CONSTRAINT "FK_9415db0846c7a3dd96ed873c631"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_c76705242ef370a7b16e6cdf542"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "type" SET DEFAULT 'user-location'`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_54fb63e36830776554d603e3f86"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "suspensionId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "UQ_e226086369e95f42b48e32b8989"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "cellPermissionId"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "cells" DROP CONSTRAINT "UQ_8f6c4001fbc47552abaee1d408a"`);
        await queryRunner.query(`ALTER TABLE "cells" DROP COLUMN "suspensionId"`);
        await queryRunner.query(`ALTER TABLE "leaders" DROP CONSTRAINT "UQ_9415db0846c7a3dd96ed873c631"`);
        await queryRunner.query(`ALTER TABLE "leaders" DROP COLUMN "cellPermissionId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_c76705242ef370a7b16e6cdf542"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "suspensionId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "new"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "suspended" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "new" boolean NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_804a07255f768bcd2441a27a7c"`);
        await queryRunner.query(`DROP TABLE "suspension"`);
        await queryRunner.query(`DROP TABLE "cell-permissions"`);
    }

}
