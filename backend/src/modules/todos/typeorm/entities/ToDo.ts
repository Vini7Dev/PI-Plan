import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';

import Admin from '../../../users/typeorm/entities/Admin';

// Representação da entidade tarefa no banco de dados
@Entity('todo')
class ToDo {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  admin_id: string;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column()
  done: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default ToDo;
