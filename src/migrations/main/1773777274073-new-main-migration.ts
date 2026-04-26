import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1773777274073 implements MigrationInterface {
    name = 'NewMainMigration1773777274073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meet-agendas" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "topic" character varying NOT NULL, "description" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "meetingId" integer, CONSTRAINT "PK_5805aed16063c8f6389b232d5d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "rating" integer NOT NULL, "status" character varying NOT NULL, "hostId" integer, "cellId" integer, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "cell_id" integer NOT NULL, "new" boolean NOT NULL, "status" character varying NOT NULL, "accountId" integer, CONSTRAINT "REL_5f7fdf59d49d16038b52f3b23b" UNIQUE ("accountId"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cells" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "no_of_members" integer NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_b9443df02c1a41bc03f264388c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "leaders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "cell_id" integer NOT NULL, "new" boolean NOT NULL, "status" character varying NOT NULL, "accountId" integer, "cellId" integer, CONSTRAINT "REL_afeb330c459c0002f6a12ccb64" UNIQUE ("accountId"), CONSTRAINT "REL_45a59c3936c96c772693468870" UNIQUE ("cellId"), CONSTRAINT "PK_6035d2826e63f39b50a34901d36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendances" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLeader" boolean NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, "departureTime" TIMESTAMP, "valid" boolean NOT NULL, "accountId" integer, "meetingId" integer, CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "rating" integer NOT NULL, "body" character varying NOT NULL, "hospitalityRating" integer, "leaderShipRating" integer, "accountId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "lastUsed"`); 
        await queryRunner.query(`ALTER TABLE "accounts" ADD "type" character varying`);
        await queryRunner.query(`UPDATE "accounts" SET "type" = 'user' WHERE "type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_3aa23c0a6d107393e8b40e3e2a6" UNIQUE ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_62471155681515721de014a625" ON "accounts" ("type") `);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meet-agendas" ADD CONSTRAINT "FK_9d1912442e28277518842d919e5" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2" FOREIGN KEY ("hostId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_15aaaa9e15891d5569a93f4fe37" FOREIGN KEY ("cellId") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_5f7fdf59d49d16038b52f3b23b1" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_e6fd46d79ca51ad99b6ba42acea" FOREIGN KEY ("cell_id") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaders" ADD CONSTRAINT "FK_afeb330c459c0002f6a12ccb645" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leaders" ADD CONSTRAINT "FK_45a59c3936c96c7726934688707" FOREIGN KEY ("cellId") REFERENCES "cells"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_22cfa84bfa4117902bc9790e1b1" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_31cfa7460568c294de880c37cee" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_24a1a986f61c614a318093f213b" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_24a1a986f61c614a318093f213b"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_31cfa7460568c294de880c37cee"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_22cfa84bfa4117902bc9790e1b1"`);
        await queryRunner.query(`ALTER TABLE "leaders" DROP CONSTRAINT "FK_45a59c3936c96c7726934688707"`);
        await queryRunner.query(`ALTER TABLE "leaders" DROP CONSTRAINT "FK_afeb330c459c0002f6a12ccb645"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_e6fd46d79ca51ad99b6ba42acea"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_5f7fdf59d49d16038b52f3b23b1"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_15aaaa9e15891d5569a93f4fe37"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2"`);
        await queryRunner.query(`ALTER TABLE "meet-agendas" DROP CONSTRAINT "FK_9d1912442e28277518842d919e5"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62471155681515721de014a625"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "lastUsed" boolean NOT NULL`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "attendances"`);
        await queryRunner.query(`DROP TABLE "leaders"`);
        await queryRunner.query(`DROP TABLE "cells"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "meet-agendas"`);
    }

}
