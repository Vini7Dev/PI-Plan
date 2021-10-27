import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Form } from '@unform/web';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import StatusButton from '../../components/StatusButton';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Header from '../../components/Header';

interface IOrderProps {
  id?: number;
  actual_status: number;
  actual_process: number;
  title: string;
  description: string;
  startDate: string;
  finalDate: string;
  furnitureDeliveryDate: string;
  cep: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  country: string;
  installationEnvironments: string;
  paymentMethod: string;
  grossValue: number;
  netValue: number;
}

// Página para criar um pedido ou apresentar os seus dados
const OrderData: React.FC = () => {
  const location = useLocation();

  // Caso exista o id do pedido na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const orderId = location.pathname.split('/order-data/')[1];
  }, [location]);

  // Função para criar um pedido ou atualizar os seus dados
  const handleCreateOrder = useCallback(() => {
    //
  }, []);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={3} />
      </div>

      <main id="form-area">
        <Header title="Cadastro de Pedido" />

        <Form onSubmit={handleCreateOrder}>
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
          />

          <Input
            label="Título"
            name="title"
            placeholder="Informe o título do pedido"
          />
          <Textarea
            label="Descrição"
            name="description"
            placeholder="Informe a descrição do pedido"
          />
          <Input
            label="Data de Início"
            name="start_date"
            placeholder="Informe a data de início"
            type="date"
          />
          <Input
            label="Data de Finalização"
            name="end_date"
            placeholder="Informe a data de finalização"
            type="date"
          />
          <Input
            label="Data de Entrega do Móvel"
            name="furniture_delivery_forecast"
            placeholder="Informe a data de entrega do móvel"
            type="date"
          />

          <h2>Endereço</h2>
          <Input
            label="CEP"
            name="cep"
            placeholder="Informe o CEP"
          />

          <div className="space-division">
            <div className="x2">
              <Input
                label="Rua"
                name="street"
                placeholder="Informe a rua"
              />
            </div>
            <div className="x-divisor" />
            <div className="x1">
              <Input
                label="Número"
                name="number"
                placeholder="Informe o número"
              />
            </div>
          </div>

          <Input
            label="Complemento"
            name="complement"
            placeholder="Informe o complemento"
          />
          <Input
            label="Bairro"
            name="district"
            placeholder="Informe o bairro"
          />

          <div className="space-division">
            <div className="x1">
              <Select
                label="UF"
                name="uf"
                options={[
                  { description: 'Integrar com os Correios' },
                  { description: 'AA' },
                  { description: 'BB' },
                  { description: 'CC' },
                  { description: 'DD' },
                ]}
              />
            </div>
            <div className="x-divisor" />
            <div className="x2">
              <Select
                label="Cidade"
                name="city"
                options={[
                  { description: 'Integrar com os Correios' },
                  { description: 'Cidade 1' },
                  { description: 'Cidade 2' },
                  { description: 'Cidade 3' },
                  { description: 'Cidade 4' },
                ]}
              />
            </div>
          </div>

          <Select
            label="País"
            name="country"
            options={[
              { description: 'Integrar com os Correios' },
              { description: 'País 1' },
              { description: 'País 2' },
              { description: 'País 3' },
              { description: 'País 4' },
            ]}
          />

          <Textarea
            label="Cômodos / Ambientes"
            name="installation_environments"
            placeholder="Descreva os cômodos e ambientes pra instalação"
          />

          <h3>Valores e Pagamento</h3>
          <Select
            label="Forma de Pagamento"
            name="payment_method"
            options={[
              { description: 'A definir os Campos' },
              { description: 'Método 1' },
              { description: 'Método 2' },
              { description: 'Método 3' },
              { description: 'Método 4' },
            ]}
          />
          <Input
            label="Valor Bruto"
            name="gross_value"
            placeholder="Informe o valor bruto"
          />
          <Input
            label="Valor em Despesas"
            name="expenses_value"
            placeholder="Informe o valor de despesas"
          />

          <Button name="Salvar" type="submit" />
        </Form>
      </main>
    </Container>
  );
};

export default OrderData;
