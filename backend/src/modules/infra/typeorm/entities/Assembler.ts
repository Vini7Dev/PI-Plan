import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { uuidv4 } from 'uuidv4';

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
    cellphone: string;

    constructor() {
      if (!this.id) {
          this.id = uuidv4();
      }
    }
}

export default Admin;
