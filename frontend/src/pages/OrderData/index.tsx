import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container } from './styles';

import NavigationButton from '../../components/NavigationBar/NavigationButton';
import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Button from '../../components/Button';

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

const OrderData: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [actualStatus, setActualStatus] = useState(1);
  const [actualProcess, setActualProcess] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [furnitureDeliveryDate, setFurnitureDeliveryDate] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(1);
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  const [country, setCountry] = useState('');
  const [installationEnvironments, setInstallationEnvironments] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [grossValue, setGrossValue] = useState(0);
  const [netValue, setNetValue] = useState(0);

  useEffect(() => {
    const orderId = location.pathname.split('/order-data/')[1];

    if(orderId) {
      const request = new XMLHttpRequest();

      request.open('GET', `http://localhost:8080/orders/${orderId}`, true);

      request.onload = function() {
        if(this.response) {
          const orderData = JSON.parse(this.response);

          setActualStatus(orderData.actual_status);
          setActualProcess(orderData.actual_process);
          setTitle(orderData.title);
          setDescription(orderData.description);
          setStartDate(orderData.startDate.split(/t+/i)[0]);
          setFinalDate(orderData.finalDate.split(/t+/i)[0]);
          setFurnitureDeliveryDate(orderData.furnitureDeliveryDate.split(/t+/i)[0]);
          setCep(orderData.cep);
          setStreet(orderData.street);
          setNumber(orderData.number);
          setComplement(orderData.complement);
          setNeighborhood(orderData.neighborhood);
          setCity(orderData.city);
          setUF(orderData.uf);
          setCountry(orderData.country);
          setInstallationEnvironments(orderData.installationEnvironments);
          setPaymentMethod(orderData.paymentMethod);
          setGrossValue(orderData.grossValue);
          setNetValue(orderData.netValue);
        }
      }

      request.send();
    }
  }, [location]);

  const handleCreateOrder = useCallback(() => {
    const orderId = location.pathname.split('/order-data/')[1];

    const request = new XMLHttpRequest();

    const order = {
      actual_status: actualStatus,
      actual_process: actualProcess,
      title,
      description,
      startDate,
      finalDate,
      furnitureDeliveryDate,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      uf,
      country,
      installationEnvironments,
      paymentMethod,
      grossValue,
      netValue,
    } as IOrderProps;

    let httpVerb = '';
    if(orderId) {
      httpVerb = 'PUT';
      order.id = Number(orderId);
    } else {
      httpVerb = 'POST';
    }

    request.open(httpVerb, `http://localhost:8080/orders`, true);

    request.setRequestHeader(`Content-Type`, `application/json`);
    request.send(JSON.stringify(order));

    alert('Sucesso!');
    history.push('/orders-list');
  }, [actualProcess, actualStatus, cep, city, complement, country, description, finalDate, grossValue, installationEnvironments, neighborhood, netValue, number, paymentMethod, furnitureDeliveryDate, startDate, street, title, uf, location, history]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Portfólio" toPage="/" />
          <NavigationButton text="Página Inicial" toPage="/dashboard"/>
          <NavigationButton text="Usuários" toPage="/users-list"/>
          <NavigationButton text="Clientes" toPage="/clients-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" id="nav-link-selected" />
          <NavigationButton text="Sair" toPage="/" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Dados do Pedido</h1>

          <Select
            autoFocus
            label="Status do Pedido"
            options={[
              { value: 1, description: 'Em andamento' },
              { value: 2, description: 'Finalizado' },
              { value: 3, description: 'Cancelado' },
            ]}
            value={actualStatus}
            onChange={(e) => setActualStatus(Number(e.target.value))}
          />
          
          <Select
            label="Processo Atual"
            options={[
              { value: 1, description: 'Iniciando' },
              { value: 2, description: 'Visita Inicial' },
              { value: 3, description: 'Modelagem do Móvel' },
              { value: 4, description: 'Reunião com o Cliente' },
              { value: 5, description: 'Pedido na Fábrica' },
              { value: 6, description: 'Instalando' },
              { value: 7, description: 'Reunião com os Montadores' },
            ]}
            value={actualProcess}
            onChange={(e) => setActualProcess(Number(e.target.value))}
          />

          <Input
            label="Título"
            placeholder="Informe o título do pedido"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Descrição"
            placeholder="Informe a descrição do pedido"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Data de Início"
            placeholder="Informe a data de início"
            type="date"
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="Data de Finalização"
            placeholder="Informe a data de finalização"
            type="date"
            defaultValue={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
          />
          <Input
            label="Data de Entrega do Móvel"
            placeholder="Informe a data de entrega do móvel"
            type="date"
            defaultValue={furnitureDeliveryDate}
            onChange={(e) => setFurnitureDeliveryDate(e.target.value)}
          />

          <h1>Endereço</h1>
          <Input
            label="CEP"
            placeholder="Informe o CEP"
            defaultValue={cep}
            onChange={(e) => setCep(e.target.value)}
          />

          <div className="-division">
            <div className="x2">
              <Input
                label="Rua"
                placeholder="Informe a rua"
                defaultValue={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="x1">
              <Input
                label="Número"
                placeholder="Informe o número"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
          </div>

          <Input
            label="Complemento"
            placeholder="Informe o complemento"
            defaultValue={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
          <Input
            label="Bairro"
            placeholder="Informe o bairro"
            defaultValue={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />

          <div className="-division">
            <div className="x1">
              <Select
                label="UF"
                options={[
                  { description: 'Integrar com os Correios' },
                  { description: 'AA' },
                  { description: 'BB' },
                  { description: 'CC' },
                  { description: 'DD' },
                ]}
                value={uf}
                onChange={(e) => setUF(e.target.value)}
              />
            </div>
            <div className="x2">
              <Select
                label="Cidade"
                options={[
                  { description: 'Integrar com os Correios' },
                  { description: 'Cidade 1' },
                  { description: 'Cidade 2' },
                  { description: 'Cidade 3' },
                  { description: 'Cidade 4' },
                ]}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <Select
            label="País"
            options={[
              { description: 'Integrar com os Correios' },
              { description: 'País 1' },
              { description: 'País 2' },
              { description: 'País 3' },
              { description: 'País 4' },
            ]}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Textarea
            label="Cômodos / Ambientes"
            placeholder="Descreva os cômodos e ambientes pra instalação"
            defaultValue={installationEnvironments}
            onChange={(e) => setInstallationEnvironments(e.target.value)}
          />

          <h1>Valores e Pagamento</h1>
          <Select
            label="Forma de Pagamento"
            options={[
              { description: 'A definir os Campos' },
              { description: 'Método 1' },
              { description: 'Método 2' },
              { description: 'Método 3' },
              { description: 'Método 4' },
            ]}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Input
            label="Valor Bruto"
            placeholder="Informe o valor bruto"
            value={grossValue}
            onChange={(e) => setGrossValue(Number(e.target.value))}
          />
          <Input
            label="Valor Líquido"
            placeholder="Informe o valor líquido"
            value={netValue}
            onChange={(e) => setNetValue(Number(e.target.value))}
          />

          <Button name="Salvar" onClick={handleCreateOrder} />
        </form>
      </main>
    </Container>
  );
};

export default OrderData;
