import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Installation from '../../../installations/typeorm/entities/Installation';

@Entity('assessment')
class Assessment {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  installation_id: string;

  @OneToOne(() => Installation)
  @JoinColumn({ name: 'installation_id' })
  installation: Installation;

  @Column('integer')
  cleaning_note: number;

  @Column('integer')
  finish_note: number;

  @Column('integer')
  manager_note: number;

  @Column('decimal')
  loss_amount: number;

  @Column('integer')
  customer_note: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    // Gerando o ID automáticamente se o objeto
    // instanciando ainda não estiver salvo no banco
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default Assessment;
