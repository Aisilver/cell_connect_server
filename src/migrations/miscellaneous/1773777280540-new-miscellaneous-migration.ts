import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1773777280540 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1773777280540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lists" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "disabled" boolean, "default" boolean, "type" character varying NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0a63755e7d4f4c3db719e832c" ON "lists" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f0a63755e7d4f4c3db719e832c"`);
        await queryRunner.query(`DROP TABLE "lists"`);
    }

}
