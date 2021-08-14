import {
  Column, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  // Este atributo é definido pelo construtor das classes filhas, não é salvo no banco
  // Ele identifica o tipo de usuário que está realizando as requisições
  protected user_type: 'admin' | 'assembler';

  constructor() {
    // Gerando o ID automáticamente quando o objeto
    // instanciando ainda não estiver salvo no banco
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  // Recuperando o tipo de usuário que está realizando as requisições
  public getUserType(): 'admin' | 'assembler' {
    return this.user_type;
  }
}

export default User;
