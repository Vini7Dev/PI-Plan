interface IAddress {
  cep: string;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  uf: string;
  country: string;
}

interface ICreateOrderDTO {
  id?: string;
  customer_id?: string;
  address: IAddress;
  current_status: number;
  current_proccess: number;
  title: string;
  description: string;
  installation_environments: string;
  start_date: string;
  end_date?: string;
  mobile_delivery_forecast?: string;
  payment_method: string;
  net_value: number;
  expenses_value: number;
}

export default ICreateOrderDTO;
