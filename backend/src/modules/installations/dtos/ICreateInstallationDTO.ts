interface IAssemblerInstallation {
  assembler_id: string;
  installation_id: string;
  commission_percentage: number;
}

interface ICreateInstallationDTO {
  id?: string;
  order_id: string;
  done: boolean;
  start_date: string;
  end_date?: string;
  completation_forecast: string;
  price: number;
  assembler_installation: IAssemblerInstallation[];
}

export default ICreateInstallationDTO;
