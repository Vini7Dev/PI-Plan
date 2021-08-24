import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAddress1629459243231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'address',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
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
          isNullable: true,
        },
        {
          name: 'complement',
          type: 'varchar',
          length: '50',
          isNullable: true,
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
    await queryRunner.dropTable('address');
  }
}
