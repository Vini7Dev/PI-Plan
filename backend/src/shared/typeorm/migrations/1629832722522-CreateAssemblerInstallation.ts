import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateAssemblerInstallation1629832722522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'assembler_installation',
      columns: [
        {
          name: 'assembler_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'installation_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'commission_percentage',
          type: 'int',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey('assembler_installation', new TableForeignKey({
      name: 'fk_assemb_install_assembler_id',
      columnNames: ['assembler_id'],
      referencedTableName: 'assembler',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('assembler_installation', new TableForeignKey({
      name: 'fk_assemb_install_installation_id',
      columnNames: ['installation_id'],
      referencedTableName: 'installation',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('assembler_installation', 'fk_assemb_install_installation_id');

    await queryRunner.dropForeignKey('assembler_installation', 'fk_assemb_install_assembler_id');

    await queryRunner.dropTable('assembler_installation');
  }
}
