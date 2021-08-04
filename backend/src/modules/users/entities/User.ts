import {
  Column, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

// Classe que contém os dados de todo usuário salvo no banco de dados
abstract class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    // Gerando o ID automáticamente quando o objeto
    // instanciando ainda não estiver salvo no banco
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
