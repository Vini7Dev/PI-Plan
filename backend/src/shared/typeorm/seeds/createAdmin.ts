import { createConnection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Criando o usuário administrador padrão
const create = async () => {
  // Criando a conexão com o banco de dados
  const connection = await createConnection();

  // Criando o usuário admin no banco de dados
  const id = uuidv4();
  const password = await hash('admin1', 8);

  await connection.query(`INSERT INTO admin(
    id, name, username, password, permission_create_admin, created_at, updated_at, deleted_at
  ) VALUES (
    '${id}',
    'Admin 1',
    'admin1',
    '${password}',
    true,
    'now()',
    'now()',
    null
  )`);

  // Fechando a conexção com o banco
  await connection.close();
};

create().then(() => {
  console.log('===> Admin user created <===');
  console.log('Username: admin1');
  console.log('Password: admin1');
}).catch(() => {
  console.log('===> Faild to create admin <===');
  console.log('Make sure the administrator already exists.');
});
