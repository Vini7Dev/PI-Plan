import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import parseDateStringToBrFormat from '../../utils/parseDateStringToBrFormat';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import StatusButton from '../../components/StatusButton';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Header from '../../components/Header';

interface IOrderProps {
  address: {
    cep: string;
    street: string;
    number: number;
    complement: string;
    district: string;
    city: string;
    uf: string;
    country: string;
  },
  id?: string;
  customer_id: string;
  current_status: number;
  current_proccess: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  furniture_delivery_forecast: string;
  installation_environments: string;
  payment_method: string;
  gross_value: number;
  expenses_value: number;
}

// Página para criar um pedido ou apresentar os seus dados
const OrderData: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [orderData, setOrderData] = useState<IOrderProps>({ address: {} } as IOrderProps);
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [currentProccess, setCurrentProccess] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [description, setDescription] = useState('');
  const [installationEnvironments, setInstallationEnvironments] = useState('');

  // Caso exista o id do pedido na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const loadOrderData = async () => {
      const orderIdFromPath = location.pathname.split('/order-data/')[1];
      const customerIdFromPath = location.search.split('=')[1];

      if(orderIdFromPath) {
        const { data: orderDataResponse } = await api.get<IOrderProps>(`/orders/${orderIdFromPath}`);

        setOrderData(orderDataResponse);
        setOrderId(orderIdFromPath);
        setCurrentStatus(orderDataResponse.current_status);
        setCurrentProccess(orderDataResponse.current_proccess);
        setSelectedUF(orderDataResponse.address.uf);
        setSelectedCity(orderDataResponse.address.city);
        setSelectedCountry(orderDataResponse.address.country);
      } else {
        setOrderData({ address: {} } as IOrderProps);
        setOrderId('');
        setCurrentStatus(0);
        setCurrentProccess(0);
        setSelectedUF('');
        setSelectedCity('');
        setSelectedCountry('');
      }

      setCustomerId(customerIdFromPath);
    }

    loadOrderData();
  }, [location]);

  // Função para criar um pedido ou atualizar os seus dados
  const handleSubmitForm = useCallback(async (data) => {
    try {
      // Criando o modelo para validação do formulário
      const shape = Yup.object().shape({
        address: Yup.object().shape({
          cep: Yup.string().length(9, 'Informe todos os 9 dígitos com traço e pontos!').required('O CEP é obrigatório!'),
          street: Yup.string().required('A rua é obrigatória!'),
          number: Yup.number().required('O número é obrigatório!'),
          complement: Yup.string(),
          district: Yup.string().required('O bairro é obrigatório!'),
          city: Yup.string().required('A cidade é obrigatória!'),
          uf: Yup.string().length(2, 'Informe as iniciais da UF').required('A UF é obrigatória!'),
          country: Yup.string().required('O país é obrigatório!'),
        }),
        current_status: Yup.number().required('O status do pedido é obrigatório!'),
        current_proccess: Yup.number().required('O processo atual é obrigatório!'),
        title: Yup.string().required('O título é obrigatório!'),
        description: Yup.string(),
        installation_environments: Yup.string().required('Os ambientes de instalação é obrigatório!'),
        start_date: Yup.string().length(10, 'Informe uma data válida!').required('A data de início é obrigatória!'),
        end_date: Yup.string().length(10, 'Informe uma data válida!'),
        furniture_delivery_forecast: Yup.string().length(10, 'Informe uma data válida!'),
        payment_method: Yup.string().required('O método de pagamento é obrigatório!'),
        gross_value: Yup.number().required('O valor bruto é obrigatório!'),
        expenses_value: Yup.number().required('O valor de despesas é obrigatório!'),
      });

      // Criando o objeto com os dados de cadastro do pedido no backend
      const orderDataToRequest = {
        address: {
          cep: data.address.cep,
          street: data.address.street,
          number: Number(data.address.number),
          complement: data.address.complement,
          district: data.address.district,
          city: data.address.city,
          uf: data.address.uf,
          country: data.address.country,
        },
        current_status: currentStatus,
        current_proccess: currentProccess,
        title: data.title,
        description,
        installation_environments: installationEnvironments,
        start_date: parseDateStringToBrFormat(data.start_date),
        end_date: parseDateStringToBrFormat(data.end_date),
        furniture_delivery_forecast: parseDateStringToBrFormat(data.furniture_delivery_forecast),
        payment_method: data.payment_method,
        gross_value: Number(data.gross_value),
        expenses_value: Number(data.expenses_value),
      };

      // Validando o formulário
      await shape.validate(orderDataToRequest, { abortEarly: false });

      if(orderId) {
        // Enviando os dados ao backend para atualizar o pedido
        await api.put(`/orders/${orderId}`, orderDataToRequest);
      } else {
        // Adicionando no cadastro o id do cliente que realizou o pedido
        Object.assign(orderDataToRequest, { customer_id: customerId });

        // Enviando os dados ao backend para criar um novo pedido
        await api.post('/orders', orderDataToRequest);
      }

      // Enviando o usuário para a tela de listagem
      history.push('/orders-list');
    } catch(error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if(error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        if(formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }
  }, [customerId, orderId, currentStatus, currentProccess, description, installationEnvironments, history]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={3} />
      </div>

      <main id="form-area">
        <Header title="Cadastro de Pedido" />

        <Form onSubmit={handleSubmitForm} ref={formRef}>
          <StatusButton
            buttonText="Cancelar Pedido"
            buttonColor="red"
            status="Em Andamento"
          />

          <Select
            label="Processo Atual"
            name="current_proccess"
            options={[
              { value: 1, description: 'Iniciando' },
              { value: 2, description: 'Visita Inicial' },
              { value: 3, description: 'Modelagem do Móvel' },
              { value: 4, description: 'Reunião com o Cliente' },
              { value: 5, description: 'Pedido na Fábrica' },
              { value: 6, description: 'Instalando' },
              { value: 7, description: 'Reunião com os Montadores' },
            ]}
            value={currentProccess}
            onChange={(e) => setCurrentProccess(Number(e.target.value))}
          />

          <div id="change-progress-buttons">
            <Button
              name="Voltar"
              size="small"
            />
            <div id='change-progress-buttons-divisor' />
            <Button
              name="Avançar"
              color="brown"
              size="small"
            />
          </div>

          <Input
            label="Título"
            name="title"
            placeholder="Informe o título do pedido"
            defaultValue={orderData.title}
          />

          <Textarea
            label="Descrição"
            name="description"
            placeholder="Informe a descrição do pedido"
            defaultValue={orderData.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            label="Data de Início"
            name="start_date"
            placeholder="Informe a data de início"
            type="date"
            defaultValue={orderData.start_date}
          />

          <Input
            label="Data de Finalização"
            name="end_date"
            placeholder="Informe a data de finalização"
            type="date"
            defaultValue={orderData.end_date}
          />

          <Input
            label="Data de Entrega do Móvel"
            name="furniture_delivery_forecast"
            placeholder="Informe a data de entrega do móvel"
            type="date"
            defaultValue={orderData.furniture_delivery_forecast}
          />

          <h2>Endereço</h2>
          <Input
            label="CEP"
            name="address.cep"
            placeholder="Informe o CEP"
            defaultValue={orderData.address.cep}
          />

          <div className="space-division">
            <div className="x2">
              <Input
                label="Rua"
                name="address.street"
                placeholder="Informe a rua"
                defaultValue={orderData.address.street}
              />
            </div>
            <div className="x-divisor" />
            <div className="x1">
              <Input
                label="Número"
                name="address.number"
                placeholder="Informe o número"
                defaultValue={orderData.address.number}
              />
            </div>
          </div>

          <Input
            label="Complemento"
            name="address.complement"
            placeholder="Informe o complemento"
            defaultValue={orderData.address.complement}
          />

          <Input
            label="Bairro"
            name="address.district"
            placeholder="Informe o bairro"
            defaultValue={orderData.address.district}
          />

          <div className="space-division">
            <div className="x1">
              <Select
                label="UF"
                name="address.uf"
                options={[
                  { description: 'Integrar com os Correios' },
                  { description: 'AA' },
                  { description: 'BB' },
                  { description: 'CC' },
                  { description: 'DD' },
                ]}
                value={selectedUF}
                onChange={(e) => setSelectedUF(e.target.value)}
              />
            </div>
            <div className="x-divisor" />
            <div className="x2">
              <Select
                label="Cidade"
                name="address.city"
                options={[
                  { description: 'Integrar com os Correios' },
                  { description: 'Cidade 1' },
                  { description: 'Cidade 2' },
                  { description: 'Cidade 3' },
                  { description: 'Cidade 4' },
                ]}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
            </div>
          </div>

          <Select
            label="País"
            name="address.country"
            options={[
              { description: 'Integrar com os Correios' },
              { description: 'País 1' },
              { description: 'País 2' },
              { description: 'País 3' },
              { description: 'País 4' },
            ]}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />

          <Textarea
            label="Cômodos / Ambientes"
            name="installation_environments"
            placeholder="Descreva os cômodos e ambientes pra instalação"
            defaultValue={orderData.installation_environments}
            onChange={(e) => setInstallationEnvironments(e.target.value)}
          />

          <h3>Valores e Pagamento</h3>
          <Input
            label="Forma de pagamento"
            name="payment_method"
            placeholder="Informe a forma de pagamento"
            defaultValue={orderData.payment_method}
          />

          <Input
            label="Valor Bruto"
            name="gross_value"
            placeholder="Informe o valor bruto"
            defaultValue={orderData.gross_value}
          />

          <Input
            label="Valor em Despesas"
            name="expenses_value"
            placeholder="Informe o valor de despesas"
            defaultValue={orderData.expenses_value}
          />

          <Button name="Salvar" type="submit" />
        </Form>
      </main>
    </Container>
  );
};

export default OrderData;
