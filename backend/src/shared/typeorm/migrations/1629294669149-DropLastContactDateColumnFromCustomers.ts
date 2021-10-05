import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropLastContactDateColumnFromCustomers1629294669149
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customer', 'last_contact_date');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('customer', new TableColumn({
      name: 'last_contact_date',
      type: 'date',
    }));
  }
}
