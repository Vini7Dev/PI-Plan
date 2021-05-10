interface IRequest {
  name: string;
  username: string;
  password: string;
  permission_create_admin: boolean;
}

class CreateAdminService {
  public async execute({
    name,
    username,
    password,
    permission_create_admin,
  }: IRequest): Promise<void> {
    console.log({
      name,
      username,
      password,
      permission_create_admin,
    });
  }
}

export default CreateAdminService;
