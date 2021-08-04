import {
  Column,
  Entity,
} from 'typeorm';

import User from './User';

// Representação da entidade montador no banco de dados que herda os dados de usuário
@Entity('assembler')
class Admin extends User {
    @Column()
    cellphone: string;
}

export default Admin;
