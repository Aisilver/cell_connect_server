import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1779301678969 implements MigrationInterface {
    name = 'NewMainMigration1779301678969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2"`);
        await queryRunner.query(`ALTER TABLE "meetings" RENAME COLUMN "hostId" TO "bookerId"`);
        await queryRunner.query(`ALTER TABLE "meetings" RENAME CONSTRAINT "UQ_f4c16c40d16a9eb2003c5dd1ff2" TO "UQ_20341901ff3a2c05c6cf8272ae2"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "arrivalTime"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "puntuality" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "validatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "validatorId" integer`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "UQ_f925c1e1c5a282ad31e97df2568" UNIQUE ("validatorId")`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "membershipId" integer`);
        await queryRunner.query(`ALTER TABLE "cells" ADD "timezone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_f925c1e1c5a282ad31e97df2568" FOREIGN KEY ("validatorId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_e5be180ea55ddff3a2dc8e10a7c" FOREIGN KEY ("membershipId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_20341901ff3a2c05c6cf8272ae2" FOREIGN KEY ("bookerId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_20341901ff3a2c05c6cf8272ae2"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_e5be180ea55ddff3a2dc8e10a7c"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_f925c1e1c5a282ad31e97df2568"`);
        await queryRunner.query(`ALTER TABLE "cells" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "membershipId"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "UQ_f925c1e1c5a282ad31e97df2568"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "validatorId"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "validatedAt"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "puntuality"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "arrivalTime" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "meetings" RENAME CONSTRAINT "UQ_20341901ff3a2c05c6cf8272ae2" TO "UQ_f4c16c40d16a9eb2003c5dd1ff2"`);
        await queryRunner.query(`ALTER TABLE "meetings" RENAME COLUMN "bookerId" TO "hostId"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2" FOREIGN KEY ("hostId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
