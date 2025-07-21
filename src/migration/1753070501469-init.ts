import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753070501469 implements MigrationInterface {
    name = 'Init1753070501469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`rid\` int NOT NULL AUTO_INCREMENT, \`sport\` varchar(255) NOT NULL, \`timeSlot\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT '待上传', \`uid\` int NULL, \`venueId\` int NULL, PRIMARY KEY (\`rid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_cf1c9ec820942f971f80da776b8\` FOREIGN KEY (\`uid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_3069aa29782412a8d0139a432a7\` FOREIGN KEY (\`venueId\`) REFERENCES \`venue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_3069aa29782412a8d0139a432a7\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_cf1c9ec820942f971f80da776b8\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
    }

}
