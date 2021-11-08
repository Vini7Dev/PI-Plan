import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateOrder1629459395197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'order',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'customer_id',
          type: 'uuid',
        },
        {
          name: 'address_id',
          type: 'uuid',
        },
        {
          name: 'current_status',
          type: 'int',
        },
        {
          name: 'current_proccess',
          type: 'int',
        },
        {
          name: 'title',
          type: 'varchar',
          length: '30',
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'installation_environments',
          type: 'varchar',
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
          name: 'furniture_delivery_forecast',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'payment_method',
          type: 'varchar',
          length: '60',
        },
        {
          name: 'net_value',
          type: 'numeric',
          scale: 2,
        },
        {
          name: 'expenses_value',
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

    await queryRunner.createForeignKey('order', new TableForeignKey({
      name: 'fk_order_customer_id',
      columnNames: ['customer_id'],
      referencedTableName: 'customer',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('order', new TableForeignKey({
      name: 'fk_order_address_id',
      columnNames: ['address_id'],
      referencedTableName: 'address',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order', 'fk_order_address_id');

    await queryRunner.dropForeignKey('order', 'fk_order_customer_id');

    await queryRunner.dropTable('order');
  }
}
