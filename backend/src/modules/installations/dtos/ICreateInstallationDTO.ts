interface IAssemblersRelation {
  assembler_id: string;
  commission_percentage: number;
}

interface ICreateInstallationDTO {
  id?: string;
  order_id: string;
  done: boolean;
  start_date: string;
  end_date?: string;
  completion_forecast: string;
  price: number;
  assemblers_installation: IAssemblersRelation[];
}

export default ICreateInstallationDTO;
