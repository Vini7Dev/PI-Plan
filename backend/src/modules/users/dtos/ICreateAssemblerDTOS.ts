// Dados para a criação / atualização dos usuários montadores
interface ICreateAssemblerDTOS {
    id?: string;
    name: string;
    username: string;
    password: string;
    cellphone: string;
}

export default ICreateAssemblerDTOS;
