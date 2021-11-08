import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateInstallation1629831916332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'installation',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'order_id',
          type: 'uuid',
        },
        {
          name: 'done',
          type: 'boolean',
          default: false,
        },
        {
          name: 'start_date',
          type: 'date',
        },
        {
          name: 'end_date',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'completion_forecast',
          type: 'date',
        },
        {
          name: 'price',
          type: 'numeric',
          scale: 2,
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

    await queryRunner.createForeignKey('installation', new TableForeignKey({
      name: 'fk_installation_order_id',
      columnNames: ['order_id'],
      referencedTableName: 'order',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('installation', 'fk_installation_order_id');

    await queryRunner.dropTable('installation');
  }
}
