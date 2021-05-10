import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Admin1620505760112 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table ({
            name: 'admin',
            columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
            },
            {
                name: 'name',
                type: 'varchar',
                length: '45',
            },
            {
                name: 'username',
                type: 'varchar',
                length: '30',
                isUnique: true,
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'created_at',
                type: 'date',
                default: 'now()',
            },
            {
                name: 'update_at',
                type: 'date',
                default: 'now()'
            },
            {
                name: 'permission_create_admin',
                type: 'boolean',
            },
        ]
        }));
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable( 'admin' );
    };

}
