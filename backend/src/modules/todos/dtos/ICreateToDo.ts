interface ICreateToDoDTO{
  id?: string;
  admin_id?: string;
  done: boolean;
  title: string;
  description: string;
}

export default ICreateToDoDTO;
