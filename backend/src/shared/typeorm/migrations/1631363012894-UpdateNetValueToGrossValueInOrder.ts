import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateNetValueToGrossValueInOrder1631363012894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('order', 'net_value', new TableColumn({
      name: 'gross_value',
      type: 'numeric',
      scale: 2,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('order', 'gross_value', new TableColumn({
      name: 'net_value',
      type: 'numeric',
      scale: 2,
    }));
  }
}
