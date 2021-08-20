import {
  Column, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';

// Classe que contém os dados dos endereços salvos no banco de dados
class Address {
  @PrimaryColumn('uuid')
  id: string;

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
}

export default Address;
