import React, { useState, useCallback, useEffect, useRef} from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import parseDateStringToBrFormat from '../../utils/parseDateStringToBrFormat';
import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import Header from '../../components/Header';

interface ICustomerProps{
  id?: string;
  send_contact_alert: boolean;
  name: string;
  phone: string;
  document?: string;
  next_contact_date: string;
}

// Página para criar um cliente ou apresentar os seus dados
const CustomerData: React.FC = () =>{
  const location = useLocation();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [customerData, setCustomerData] = useState<ICustomerProps>({} as ICustomerProps);
  const [customerId, setCustomerId] = useState('');
  const [sendContactAlert, setSendContactAlert] = useState(false);

  // Caso exista o id do cliente na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const loadUserData = async () => {
      const customerIdFromPath = location.pathname.split('/customer-data/')[1];

      // Caso exista o id, buscando os dados do usuário
      if(customerIdFromPath) {
        // Buscando os dados
        const { data: customerDataResponse } = await api.get<ICustomerProps>(`/customers/${customerIdFromPath}`);

        // Salvando os dados do usuário
        setCustomerData(customerDataResponse);
        setCustomerId(customerIdFromPath);
        setSendContactAlert(customerDataResponse.send_contact_alert);
      } else {
        setCustomerData({} as ICustomerProps);
      }
    }

    loadUserData();
  }, [location]);

  // Função para criar um cliente ou atualizar os seus dados
  const handleSubmitForm = useCallback(async (data) => {
    try {
      // Criando o modelo para validação do formulário
      const shape = Yup.object().shape({
        send_contact_alert: Yup.bool().required('Informe se deseja receber alerta de contato para este cliente!'),
        name: Yup.string().required('O nome é obrigatório!'),
        phone: Yup.string().max(15, 'Informe no máximo 15 números!').required('O telefone é obrigatório!'),
        document: Yup.string().max(18, 'Informe ao máximo 18 números para o documento!'),
        next_contact_date: Yup.string().required('A data do próximo contato é obrigatório!'),
      });

      // Criando o objeto com os dados de cadastro do cliente
      const customerDataToRequest = {
        send_contact_alert: sendContactAlert,
        name: data.name,
        phone: data.phone,
        document: data.document || undefined,
        next_contact_date: parseDateStringToBrFormat(data.next_contact_date),
      };

      // Validando os dados
      await shape.validate(customerDataToRequest, { abortEarly: false });

      if (customerId) {
        // Enviando os dados ao backend
        await api.put(`/customers/${customerId}`, customerDataToRequest);
      } else {
        // Enviando os dados ao backend
        await api.post('/customers', customerDataToRequest);
      }

      // Enviando o usuário para a tela de listagem
      history.push('/customers-list');
    } catch(error) {
      console.log(error);

      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if(error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        if(formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }
  },[customerId, sendContactAlert, history]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={2} />
      </div>

      <main>
        <section id="form-area">
          <Header title="Cadastro de Cliente" />

          <Form onSubmit={handleSubmitForm} ref={formRef}>
            <Input
            label="Nome"
            name="name"
            placeholder="Digíte o Nome"
            defaultValue={customerData.name}
            />

            <Input
            label="Telefone"
            name="phone"
            placeholder="Digíte o Telefone"
            defaultValue={customerData.phone}
            />

            <Input
            label="CPF/CNPJ"
            name="document"
            placeholder="Digíte o CPF ou o CNPJ"
            defaultValue={customerData.document}
            />

            <h2>Alerta de Contato</h2>

            <ChechBox
              label="Emitir o alerta de contato para este Cliente"
              name="send_contact_alert"
              onChange={(e) => setSendContactAlert(e.target.checked)}
              checked={sendContactAlert}
            />

            <Input
            label="Próximo Contato"
            name="next_contact_date"
            placeholder="Informe a data do Próximo Contato"
            type="date"
            defaultValue={customerData.next_contact_date}
            />

            <Button name="Cadastrar" type="submit" />
          </Form>
        </section>

        <section id="table-area">
          <div id="table-border">
            <div id="table-title-area">
              <h3>Pedidos do Cliente</h3>
              <Button
                name="Adicionar"
                color="green"
                size="small"
              />
            </div>

            <Table>
              <thead>
                <tr>
                  <th className="start-border-r td-x1">Status</th>
                  <th className="text-left td-x3">Título</th>
                  <th className="end-border-r td-x2">Processo Atual</th>
                </tr>
              </thead>
              <tbody>
                    <tr key={1}>
                      <td className="text-center td-id td-x1">
                        <Link to={`/order-data/${1}`}>
                          <span
                            className="ic ic-inprogress"
                          >IC</span>
                        </Link>
                      </td>
                      <td className="text-left td-x3">
                        <Link to={`/order-data/${1}`}>
                          Armário de Cozinha
                        </Link>
                        </td>
                      <td className="text-center td-x2">
                      <Link to={`/order-data/${1}`}>
                        {
                          function () {
                            switch(1 - 0) {
                              case(1):
                                return 'Iniciando';
                              case(2):
                                return 'Pedido na Fábrica'
                              case(3):
                                return 'Instalando'
                              case(4):
                                return 'Reunião com os Montadores'
                              default:
                                return 'Não Encontrado';
                            }
                          }()
                        }
                        </Link>
                        <button className="ic-remove" onClick={() => console.log(1)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </main>
    </Container>
  );
};

export default CustomerData;
