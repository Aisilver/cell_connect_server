import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMainMigration1773833782687 implements MigrationInterface {
    name = 'NewMainMigration1773833782687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "meetingId" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_3a51165bf433e8213b3c1a6c409" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_3a51165bf433e8213b3c1a6c409"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "meetingId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "name"`);
    }

}
