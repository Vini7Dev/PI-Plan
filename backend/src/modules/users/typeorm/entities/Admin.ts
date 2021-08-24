import User from './User';

import {
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';


// Representação da entidade administrador no banco de dados que herda os dados de usuário
@Entity('admin')
class Admin extends User {
  @Column()
  permission_create_admin: boolean;

  constructor() {
    super();
    this.user_type = 'admin';
  }
}
export default Admin;
