import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1723573926099 implements MigrationInterface {
    name = 'InitTable1723573926099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` ADD CONSTRAINT \`FK_aac53a9364896452e463139e4a0\` FOREIGN KEY (\`category_id\`) REFERENCES \`newCategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_9dfbe41feccfa95c9dc3d397488\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listing\` ADD CONSTRAINT \`FK_33bd8a3b7eeccb95ae45038d956\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_33bd8a3b7eeccb95ae45038d956\``);
        await queryRunner.query(`ALTER TABLE \`listing\` DROP FOREIGN KEY \`FK_9dfbe41feccfa95c9dc3d397488\``);
        await queryRunner.query(`ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_aac53a9364896452e463139e4a0\``);
    }

}
