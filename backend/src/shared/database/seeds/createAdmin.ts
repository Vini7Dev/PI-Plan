import { createConnection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Criando o usuário administrador padrão
const create = async () => {
  // Criando a conexão com o banco de dados
  const connection = await createConnection();

  // Criando o usuário admin no banco de dados
  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(`INSERT INTO admin(
    id, name, username, password, permission_create_admin, created_at, updated_at, deleted_at
  ) VALUES (
    '${id}',
    'Admin',
    'admin',
    '${password}',
    true,
    'now()',
    'now()',
    null
  )`);

  // Fechando a conexção com o banco
  await connection.close();
};

create().then(() => console.log('===> Admin user created <==='));
