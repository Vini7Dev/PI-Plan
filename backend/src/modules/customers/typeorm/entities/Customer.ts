import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Order from '../../../orders/typeorm/entities/Order';

// Classe que contém os dados dos clientes salvos no banco de dados
@Entity('customer')
class Customer {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(
    () => Order,
    (order) => order.customer,
    { cascade: true },
  )
  orders: Order[];

  @Column('boolean')
  send_contact_alert: boolean;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  document: string;

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
