import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

// Classe que contém os dados dos clientes salvos no banco de dados
@Entity('customer')
class Customer {
  @PrimaryColumn('uuid')
  id: string;

  @Column('boolean')
  send_contact_alert: boolean;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  document: string;

  @Column('date')
  last_contact_date: string;

  @Column('date')
  next_contact_date: string;

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

export default Customer;
