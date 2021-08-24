import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Admin from "../../../users/typeorm/entities/Admin";

@Entity('todo')
class ToDo{
    @PrimaryColumn('uuid')
    id: String;

    @Column()
    admin_id: string;

    @ManyToOne(() => Admin)
    @JoinColumn({ name: 'admin_id' })
    admin: Admin;

    @Column()
    done: Boolean;

    @Column()
    title: String;

    @Column()
    description: String;

    @CreateDateColumn()
    created_at: Date;
}

export default ToDo