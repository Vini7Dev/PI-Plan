interface ICreateAdminDTOS {
    id?: string;
    name: string;
    username: string;
    password: string;
    permission_create_admin?: boolean;
}
export default ICreateAdminDTOS;