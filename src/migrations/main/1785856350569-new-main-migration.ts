import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1785856350569 implements MigrationInterface {
    name = 'NewMainMigration1785856350569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_22cfa84bfa4117902bc9790e1b1"`);
        await queryRunner.query(`CREATE TABLE "offline-members" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying, "email" character varying, "DOB" TIMESTAMP NOT NULL, "gender" character varying NOT NULL, "maritalStatus" character varying NOT NULL, "cellId" integer, CONSTRAINT "PK_c45ae3649d6dda73064ca5c89f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "isLeader"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "offlineMembershipId" integer`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_f925c1e1c5a282ad31e97df2568"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "UQ_f925c1e1c5a282ad31e97df2568"`);
        await queryRunner.query(`ALTER TABLE "offline-members" ADD CONSTRAINT "FK_7a67c9a9897f96257f6d55c7a32" FOREIGN KEY ("cellId") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_f925c1e1c5a282ad31e97df2568" FOREIGN KEY ("validatorId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_856c7330d12b1e11b96773ace09" FOREIGN KEY ("offlineMembershipId") REFERENCES "offline-members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_856c7330d12b1e11b96773ace09"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_f925c1e1c5a282ad31e97df2568"`);
        await queryRunner.query(`ALTER TABLE "offline-members" DROP CONSTRAINT "FK_7a67c9a9897f96257f6d55c7a32"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "UQ_f925c1e1c5a282ad31e97df2568" UNIQUE ("validatorId")`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_f925c1e1c5a282ad31e97df2568" FOREIGN KEY ("validatorId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "offlineMembershipId"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "isLeader" boolean NOT NULL`);
        await queryRunner.query(`DROP TABLE "offline-members"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_22cfa84bfa4117902bc9790e1b1" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
