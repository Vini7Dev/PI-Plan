class DeleteAdminService {
  public async execute(id: string): Promise<void> {
    console.log(`Admin deleted. ${id}`);
  }
}

export default DeleteAdminService;
