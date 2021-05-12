import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('admin')
class Admin {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    cellphone: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        // Gerando o ID automáticamente quando o objeto
        // instanciando ainda não estiver salvo no banco
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export default Admin;
