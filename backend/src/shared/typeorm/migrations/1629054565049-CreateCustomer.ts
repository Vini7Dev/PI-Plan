import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomer1629054565049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'customer',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'send_contact_alert',
          type: 'boolean',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '30',
        },
        {
          name: 'phone',
          type: 'varchar',
          length: '15',
        },
        {
          name: 'document',
          type: 'varchar',
          length: '18',
        },
        {
          name: 'last_contact_date',
          type: 'date',
        },
        {
          name: 'next_contact_date',
          type: 'date',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'deleted_at',
          type: 'timestamp with time zone',
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer');
  }
}
