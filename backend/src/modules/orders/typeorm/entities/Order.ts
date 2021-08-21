import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Customer from '../../../customers/typeorm/entities/Customer';
import Address from './Address';

// Classe que contém os dados dos pedidos salvos no banco de dados
@Entity('order')
class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('uuid')
  address_id: string;

  @OneToOne(() => Address, (address) => address.order, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  @JoinTable()
  address: Address;

  @Column('int')
  current_status: number;

  @Column('int')
  current_proccess: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  installation_environments: string;

  @Column('date')
  mobile_delivery_forecast: string;

  @Column('date')
  start_date: string;

  @Column('date')
  end_date: string;

  @Column()
  payment_method: string;

  @Column('numeric')
  net_value: number;

  @Column('numeric')
  expenses_value: number;

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

export default Order;
