import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Order from './Order';

// Classe que contém os dados dos endereços salvos no banco de dados
@Entity('address')
class Address {
  @PrimaryColumn('uuid')
  id: string;

  order: Order;

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

export default Address;
