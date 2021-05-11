interface IRequest {
    id: string;
    name: string;
    username: string;
    current_password: string;
    new_password?: string;
}

class UpdateAdminService {
    public async execute({
        id,
        name,
        username,
        current_password,
        new_password,
    }: IRequest): Promise<void> {
        console.log({
            id,
            name,
            username,
            current_password,
            new_password,
        });
    }
}

export default UpdateAdminService;
