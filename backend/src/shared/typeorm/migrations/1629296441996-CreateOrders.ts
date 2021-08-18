import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

// Criando a tabela de pedidos
export class CreateOrders1629296441996 implements MigrationInterface {
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
        },
        {
          name: 'cep',
          type: 'char',
          length: '9',
        },
        {
          name: 'street',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'number',
          type: 'int',
        },
        {
          name: 'complement',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'district',
          type: 'varchar',
          length: '60',
        },
        {
          name: 'city',
          type: 'varchar',
          length: '45',
        },
        {
          name: 'uf',
          type: 'char',
          length: '2',
        },
        {
          name: 'country',
          type: 'varchar',
          length: '45',
        },
        {
          name: 'installation_environments',
          type: 'varchar',
        },
        {
          name: 'mobile_delivery_forecast',
          type: 'date',
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
      name: 'fk_orders_customer_id',
      columnNames: ['customer_id'],
      referencedTableName: 'customer',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'fk_orders_customer_id');

    await queryRunner.dropTable('order');
  }
}
