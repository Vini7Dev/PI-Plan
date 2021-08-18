// Dados para a criação / atualização dos clientes
interface ICreateCustomerDTO {
  id?: string;
  send_contact_alert: boolean;
  name: string;
  phone: string;
  document: string;
  next_contact_date: string;
}

export default ICreateCustomerDTO;
