import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753083469804 implements MigrationInterface {
    name = 'Init1753083469804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`oid\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` varchar(255) NOT NULL DEFAULT '已提交', \`reservationIds\` varchar(255) NOT NULL, \`uid\` int NULL, PRIMARY KEY (\`oid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a0f2cc435c1f58b4e6494e8abda\` FOREIGN KEY (\`uid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a0f2cc435c1f58b4e6494e8abda\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
