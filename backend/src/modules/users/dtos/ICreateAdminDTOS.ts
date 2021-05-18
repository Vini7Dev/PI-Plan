// Dados para a criação / atualização dos usuários administradores
interface ICreateAdminDTOS {
    id?: string;
    name: string;
    username: string;
    password: string;
    permission_create_admin?: boolean;
}

export default ICreateAdminDTOS;
