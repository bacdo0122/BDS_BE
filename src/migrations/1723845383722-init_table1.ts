import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable11723845383722 implements MigrationInterface {
    name = 'InitTable11723845383722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`newCategory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`userId\` int NOT NULL, \`category_id\` int NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`password\` varchar(255) NULL, \`avatar\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`listingCategory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`listingType\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`direction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`listing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`regionId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`address\` varchar(255) NOT NULL, \`area\` decimal NOT NULL, \`status\` enum ('pending', 'done') NOT NULL DEFAULT 'pending', \`legal_status\` tinyint NOT NULL, \`bedrooms\` int NOT NULL, \`bathrooms\` int NOT NULL, \`furnishing\` tinyint NOT NULL, \`orientation\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`price\` decimal NOT NULL, \`image\` text NOT NULL, \`expiration_date\` timestamp NOT NULL, \`direction_id\` int NOT NULL, \`category_id\` int NOT NULL, \`type_id\` int NOT NULL, \`pricePerArea\` decimal NOT NULL DEFAULT '0', \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`region\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`wardId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`district\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ward\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`districtId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`news\` ADD CONSTRAINT \`FK_9198b86c4c22bf6852c43f3b44e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`news\` ADD CONSTRAINT \`FK_aac53a9364896452e463139e4a0\` FOREIGN KEY (\`category_id\`) REFERENCES \`newCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_9dfbe41feccfa95c9dc3d397488\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_33bd8a3b7eeccb95ae45038d956\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_b4f9bd11b831350cd82d52752fe\` FOREIGN KEY (\`direction_id\`) REFERENCES \`direction\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_1ea865202ab9ef9ebd39e2accf8\` FOREIGN KEY (\`category_id\`) REFERENCES \`listingCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_1ceacd881fec4bb75f74f2c7c5c\` FOREIGN KEY (\`type_id\`) REFERENCES \`listingType\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`region\` ADD CONSTRAINT \`FK_70aeac0f1f71fa776e312a078ea\` FOREIGN KEY (\`wardId\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_19a3bc9b3be291e8b9bc2bb623b\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_19a3bc9b3be291e8b9bc2bb623b\``);
        await queryRunner.query(`ALTER TABLE \`region\` DROP FOREIGN KEY \`FK_70aeac0f1f71fa776e312a078ea\``);
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_1ceacd881fec4bb75f74f2c7c5c\``);
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_1ea865202ab9ef9ebd39e2accf8\``);
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_b4f9bd11b831350cd82d52752fe\``);
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_33bd8a3b7eeccb95ae45038d956\``);
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_9dfbe41feccfa95c9dc3d397488\``);
        await queryRunner.query(`ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_aac53a9364896452e463139e4a0\``);
        await queryRunner.query(`ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_9198b86c4c22bf6852c43f3b44e\``);
        await queryRunner.query(`DROP TABLE \`ward\``);
        await queryRunner.query(`DROP TABLE \`district\``);
        await queryRunner.query(`DROP TABLE \`region\``);
        await queryRunner.query(`DROP TABLE \`listing\``);
        await queryRunner.query(`DROP TABLE \`direction\``);
        await queryRunner.query(`DROP TABLE \`listingType\``);
        await queryRunner.query(`DROP TABLE \`listingCategory\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`news\``);
        await queryRunner.query(`DROP TABLE \`newCategory\``);
    }

}
