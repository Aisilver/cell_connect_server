import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1778289014353 implements MigrationInterface {
    name = 'NewMainMigration1778289014353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting-edit-logs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title_changed" boolean, "description_changed" boolean, "venue_changed" boolean, "date_time_changed" boolean, "agenda_changed" boolean, "editorId" integer, "meetingId" integer, CONSTRAINT "REL_e51e9221465488416dc288e881" UNIQUE ("editorId"), CONSTRAINT "PK_a2c49bb1a4916f0aca31c53317a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "new" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "UQ_f4c16c40d16a9eb2003c5dd1ff2" UNIQUE ("hostId")`);
        await queryRunner.query(`ALTER TABLE "meeting-edit-logs" ADD CONSTRAINT "FK_e51e9221465488416dc288e881a" FOREIGN KEY ("editorId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting-edit-logs" ADD CONSTRAINT "FK_93b4283af8fbc2dddb6e71ebf50" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2" FOREIGN KEY ("hostId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2"`);
        await queryRunner.query(`ALTER TABLE "meeting-edit-logs" DROP CONSTRAINT "FK_93b4283af8fbc2dddb6e71ebf50"`);
        await queryRunner.query(`ALTER TABLE "meeting-edit-logs" DROP CONSTRAINT "FK_e51e9221465488416dc288e881a"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "UQ_f4c16c40d16a9eb2003c5dd1ff2"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_f4c16c40d16a9eb2003c5dd1ff2" FOREIGN KEY ("hostId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "new" SET DEFAULT true`);
        await queryRunner.query(`DROP TABLE "meeting-edit-logs"`);
    }

}
