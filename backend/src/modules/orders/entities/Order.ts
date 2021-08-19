import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// Classe que contém os dados dos pedidos salvos no banco de dados
@Entity('order')
class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @Column('int')
  current_status: number;

  @Column('int')
  current_proccess: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column('int')
  number: number;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  country: string;

  @Column()
  installation_environments: string;

  @Column()
  mobile_delivery_forecast: string;

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
}

export default Order;
