import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753881512356 implements MigrationInterface {
    name = 'Init1753881512356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('学生', '老师') NOT NULL, UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sport\` (\`sid\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`venueId\` int NOT NULL, PRIMARY KEY (\`sid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`venue\` (\`vid\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`vid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`venueId\` int NOT NULL, \`userId\` int NOT NULL, \`content\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`oid\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` varchar(255) NOT NULL DEFAULT '已提交', \`uid\` int NULL, PRIMARY KEY (\`oid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`addedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`order_id\` int NULL, \`reservation_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`rid\` int NOT NULL AUTO_INCREMENT, \`timeSlot\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT '待上传', \`uid\` int NULL, \`venueId\` int NULL, \`sportId\` int NULL, PRIMARY KEY (\`rid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sport\` ADD CONSTRAINT \`FK_91783964bcb10637a4980e45268\` FOREIGN KEY (\`venueId\`) REFERENCES \`venue\`(\`vid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a0f2cc435c1f58b4e6494e8abda\` FOREIGN KEY (\`uid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_reservation\` ADD CONSTRAINT \`FK_3eedb7013f9bc062961a396b81f\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`oid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_reservation\` ADD CONSTRAINT \`FK_6500ac520719394a07b1351badc\` FOREIGN KEY (\`reservation_id\`) REFERENCES \`reservation\`(\`rid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_cf1c9ec820942f971f80da776b8\` FOREIGN KEY (\`uid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_3069aa29782412a8d0139a432a7\` FOREIGN KEY (\`venueId\`) REFERENCES \`venue\`(\`vid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_b939d03a737efca2be7517b9b57\` FOREIGN KEY (\`sportId\`) REFERENCES \`sport\`(\`sid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_b939d03a737efca2be7517b9b57\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_3069aa29782412a8d0139a432a7\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_cf1c9ec820942f971f80da776b8\``);
        await queryRunner.query(`ALTER TABLE \`order_reservation\` DROP FOREIGN KEY \`FK_6500ac520719394a07b1351badc\``);
        await queryRunner.query(`ALTER TABLE \`order_reservation\` DROP FOREIGN KEY \`FK_3eedb7013f9bc062961a396b81f\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a0f2cc435c1f58b4e6494e8abda\``);
        await queryRunner.query(`ALTER TABLE \`sport\` DROP FOREIGN KEY \`FK_91783964bcb10637a4980e45268\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`order_reservation\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`venue\``);
        await queryRunner.query(`DROP TABLE \`sport\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
