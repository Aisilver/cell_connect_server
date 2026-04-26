import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMiscellaneousMigration1775704633695 implements MigrationInterface {
    name = 'NewMiscellaneousMigration1775704633695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity-time-records" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accountId" integer NOT NULL, "entryTime" TIMESTAMP NOT NULL, "timeDifference" integer NOT NULL, "exitTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_068af029ec1ff36a35f4f6bd710" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "activity-time-records"`);
    }

}
