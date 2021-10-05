import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class Assessment1630974806333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'assessment',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'installation_id',
            type: 'uuid',
          },
          {
            name: 'cleaning_note',
            type: 'int',
          },
          {
            name: 'finish_note',
            type: 'int',
          },
          {
            name: 'customer_note',
            type: 'int',
          },
          {
            name: 'manager_note',
            type: 'int',
          },
          {
            name: 'loss_amount',
            type: 'float',
          },
          {
            name: 'comment',
            type: 'varchar',
            length: '100',
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
      }),
    );

    await queryRunner.createForeignKey('assessment', new TableForeignKey({
      name: 'fk_assessments_installation_id',
      columnNames: ['installation_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'installation',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('assessment', 'fk_assessments_installation_id');

    await queryRunner.dropTable('assessment');
  }
}
