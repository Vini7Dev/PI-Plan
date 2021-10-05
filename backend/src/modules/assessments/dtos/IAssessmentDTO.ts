interface IAssessmentDTO{
  id?: string;
  installation_id?: string;
  cleaning_note: number;
  finish_note: number;
  customer_note: number;
  manager_note: number;
  loss_amount: number;
  comment: string;
}

export default IAssessmentDTO;
