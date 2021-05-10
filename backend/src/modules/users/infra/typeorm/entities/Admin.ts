import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('admin')
class Admin{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column()
    permission_create_admin: boolean;

    constructor() {
      if (!this.id) {
          this.id = uuid();
      }
    }
}
export default Admin;
