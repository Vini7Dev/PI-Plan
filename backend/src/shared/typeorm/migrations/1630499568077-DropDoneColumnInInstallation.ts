import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropDoneColumnInInstallation1630499568077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('installation', 'done');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('installation', new TableColumn({
      name: 'done',
      type: 'boolean',
      default: false,
    }));
  }
}
