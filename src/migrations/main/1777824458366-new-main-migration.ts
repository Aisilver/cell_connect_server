import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1777824458366 implements MigrationInterface {
    name = 'NewMainMigration1777824458366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "currentLeadershipId" integer`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_ff075eda396deb56eb116ba7dc4" UNIQUE ("currentLeadershipId")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "currentMembershipId" integer`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_9055debdc4a2a1c82e45b7f554d" UNIQUE ("currentMembershipId")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_ff075eda396deb56eb116ba7dc4" FOREIGN KEY ("currentLeadershipId") REFERENCES "leaders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_9055debdc4a2a1c82e45b7f554d" FOREIGN KEY ("currentMembershipId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_9055debdc4a2a1c82e45b7f554d"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_ff075eda396deb56eb116ba7dc4"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_9055debdc4a2a1c82e45b7f554d"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "currentMembershipId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_ff075eda396deb56eb116ba7dc4"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "currentLeadershipId"`);
    }

}
