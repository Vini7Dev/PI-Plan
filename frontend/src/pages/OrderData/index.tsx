import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  FocusEvent
} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import parseDateStringToBrFormat from '../../utils/parseDateStringToBrFormat';
import getOrderProcessArray from '../../utils/getOrderProcessArray';
import { getAddressByCep, getCitiesListByUF, getUFsList } from '../../utils/getAddressData';
import { Container, Table } from './styles';

import Loading from '../../components/Loading';
import ModalView from '../../components/ModalView';
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
  installation: {
    id: string;
    current_status: number;
    start_date: string;
    end_date?: string;
    completion_forecast?: string;
  }
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
  const [loadingData, setLoadingData] = useState(false);
  const [orderData, setOrderData] = useState<IOrderProps>({ address: {} } as IOrderProps);
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [currentProccess, setCurrentProccess] = useState(0);
  const [selectedStreet, setSelectedStreet] = useState('');
  const [selectedComplement, setSelectedComplement] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [description, setDescription] = useState('');
  const [installationEnvironments, setInstallationEnvironments] = useState('');
  const [citiesList, setCitiesList] = useState<{ description: string }[]>([]);

  // Caso exista o id do pedido na rota, buscar os seus dados no banco de dados
  const loadOrderData = useCallback(async () => {
    setLoadingData(true);

    try {
      const orderIdFromPath = location.pathname.split('/order-data/')[1];
      const customerIdFromPath = location.search.split('=')[1];

      if (orderIdFromPath) {
        const { data: orderDataResponse } = await api.get<IOrderProps>(`/orders/${orderIdFromPath}`);

        setOrderData(orderDataResponse);
        setOrderId(orderIdFromPath);
        setCurrentProccess(orderDataResponse.current_proccess);
        setSelectedStreet(orderDataResponse.address.street);
        setSelectedComplement(orderDataResponse.address.complement);
        setSelectedDistrict(orderDataResponse.address.district);
        setSelectedUF(orderDataResponse.address.uf);
        setSelectedCity(orderDataResponse.address.city);
        setSelectedCountry(orderDataResponse.address.country);
        setDescription(orderDataResponse.description);
        setInstallationEnvironments(orderDataResponse.installation_environments);
      } else {
        setOrderData({ address: {} } as IOrderProps);
        setOrderId('');
        setCurrentProccess(0);
        setSelectedStreet('');
        setSelectedComplement('');
        setSelectedDistrict('');
        setSelectedUF('');
        setSelectedCity('');
        setSelectedCountry('');
        setDescription('');
        setInstallationEnvironments('');
      }

      setCustomerId(customerIdFromPath);
    } catch (err) {
      console.log(err);
    }

    setLoadingData(false);
  }, [location]);

  useEffect(() => {
    loadOrderData();
  }, [loadOrderData]);

  // Buscando a lista de cidades por UF
  useEffect(() => {
    const handleGetCitiesListByUF = async () => {
      const citiesListResponse = await getCitiesListByUF(selectedUF);

      setCitiesList(citiesListResponse);
    }

    handleGetCitiesListByUF();
  }, [selectedUF])

  // Buscando o endereço com base no cep
  const handleGetAddressByCep = useCallback(async (e: FocusEvent<HTMLInputElement>) => {
    setLoadingData(true);

    // Recuperando os CEP informado (removendo o -)
    const cepValue = e.target.value.replace(/-/g, '');

    try {
      // Buscando o endereço
      const addressData = await getAddressByCep(cepValue);

      setSelectedStreet(addressData.logradouro);
      setSelectedComplement(addressData.complemento);
      setSelectedDistrict(addressData.bairro);
      setSelectedUF(addressData.uf);
      setSelectedCity(addressData.localidade);
      setSelectedCountry('Brasil');
    } catch {
      setSelectedStreet('');
      setSelectedComplement('');
      setSelectedDistrict('');
      setSelectedUF('--');
      setSelectedCity('Outro');
      setSelectedCountry('Outro');
    }

    setLoadingData(false);
  }, []);

  // Função para criar um pedido ou atualizar os seus dados
  const handleSubmitForm = useCallback(async (data) => {
    setLoadingData(true);

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
          uf: Yup.string().length(2, 'Informe a UF').required('A UF é obrigatória!'),
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
        current_status: data.end_date ? 1 : 0,
        current_proccess: currentProccess,
        title: data.title,
        description,
        installation_environments: installationEnvironments,
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        furniture_delivery_forecast: data.furniture_delivery_forecast || undefined,
        payment_method: data.payment_method,
        gross_value: Number(data.gross_value),
        expenses_value: Number(data.expenses_value),
      };

      // Validando o formulário
      await shape.validate(orderDataToRequest, { abortEarly: false });

      if (orderId) {
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
    } catch (error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        if (formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }

    setLoadingData(false);
  }, [customerId, orderId, currentProccess, description, installationEnvironments, history]);

  // Função para voltar um passo do processo do pedido
  const handleToGoBackOnCurrentProcess = useCallback(() => {
    // Verificando se não está no primeiro passo
    if (currentProccess > 0) {
      setCurrentProccess(currentProccess - 1);
    }
  }, [currentProccess]);

  // Função para avançar um processo do pedido
  const handleToGoForewardOnCurrentProcess = useCallback(() => {
    // Verificando se não está no último passo
    if (currentProccess < getOrderProcessArray().length - 1) {
      setCurrentProccess(currentProccess + 1);
    }
  }, [currentProccess]);

  // Função para redirecionar para a tela de cadastro da instalação
  const handleGoToRegisterInstallation = useCallback(() => {
    history.push(`/installation-data?order_id=${orderId}`);
  }, [orderId, history]);

  // Função para apagar a instalação
  const handleDeleteInstallation = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar a instalação
    const response = confirm('Você realmente deseja apagar a instalação?');

    if (!response) {
      return;
    }

    await api.delete(`/installations/${id}`);

    loadOrderData();
  }, [loadOrderData]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={3} />
      </div>

      <div id="content-area">
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
              options={getOrderProcessArray().map((process, index) => ({
                value: index, description: process,
              }))}
              value={currentProccess}
              onChange={(e) => setCurrentProccess(Number(e.target.value))}
            />

            <div id="change-progress-buttons">
              <Button
                name="Voltar"
                size="small"
                onClick={handleToGoBackOnCurrentProcess}
              />
              <div id='change-progress-buttons-divisor' />
              <Button
                name="Avançar"
                color="brown"
                size="small"
                onClick={handleToGoForewardOnCurrentProcess}
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
              onBlur={handleGetAddressByCep}
            />

            <div className="space-division">
              <div className="x2">
                <Input
                  label="Rua"
                  name="address.street"
                  placeholder="Informe a rua"
                  defaultValue={orderData.address.street}
                  value={selectedStreet}
                  onChange={(e) => setSelectedStreet(e.target.value)}
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
              value={selectedComplement}
              onChange={(e) => setSelectedComplement(e.target.value)}
            />

            <Input
              label="Bairro"
              name="address.district"
              placeholder="Informe o bairro"
              defaultValue={orderData.address.district}
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            />

            <div className="space-division">
              <div className="x1">
                <Select
                  label="UF"
                  name="address.uf"
                  options={getUFsList()}
                  value={selectedUF}
                  onChange={(e) => setSelectedUF(e.target.value)}
                />
              </div>
              <div className="x-divisor" />
              <div className="x2">
                <Select
                  label="Cidade"
                  name="address.city"
                  options={citiesList}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                />
              </div>
            </div>

            <Select
              label="País"
              name="address.country"
              options={[
                { description: 'Brasil' },
                { description: 'Outro' },
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

        <section>
          <div id="table-border">
            <div id="table-title-area">
              <h3>Instalação</h3>
            </div>

            <Table>
              <thead>
                <tr>
                  <th className="start-border-r td-x1">Status</th>
                  <th className="text-center td-x2">Início</th>
                  <th className="end-border-r td-x2">Finalização (Previsão)</th>
                </tr>
              </thead>
              <tbody>
                {
                  orderData.installation
                    ? (
                      <tr>
                        <td className="text-center td-id td-x1">
                          <Link to={`/installation-data/${orderData.installation.id}?order_id=${orderId}`}>
                            <span
                              className={`ic ${orderData.installation.end_date ? 'ic-completed' : 'ic-inprogress'
                                }`}
                            >IC</span>
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={`/installation-data/${orderData.installation.id}?order_id=${orderId}`}>
                            {parseDateStringToBrFormat(orderData.installation.start_date)}
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={`/installation-data/${orderData.installation.id}?order_id=${orderId}`}>
                            {parseDateStringToBrFormat(orderData.installation.end_date || orderData.installation.completion_forecast)}
                          </Link>
                          <button
                            className="ic-remove"
                            onClick={() => handleDeleteInstallation(orderData.installation.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    )
                    : <tr><td colSpan={3} id="empty-installation-data">
                      <Button
                        name="Cadastrar Instalação"
                        size="small"
                        onClick={
                          orderId
                            ? handleGoToRegisterInstallation
                            : () => alert('Pedido não cadastrado!')
                        }
                      />
                    </td></tr>
                }
              </tbody>
            </Table>
          </div>
        </section>
      </div>

      <ModalView title="" isOpen={loadingData}>
        <Loading />
      </ModalView>
    </Container>
  );
};

export default OrderData;
