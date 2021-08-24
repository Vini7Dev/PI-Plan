import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTodo1629400569917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'todo',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'admin_id',
                        type: 'uuid',
                    },
                    {
                        name: 'done',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '45'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                      },
                ]
            })
        )

        await queryRunner.createForeignKey('todo', new TableForeignKey({
            name: 'fk_todo_admin_id',
            columnNames: ['admin_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'admin',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('todo', 'fk_todo_admin_id');

        await queryRunner.dropTable('todo');
    }

}
