import React, { useCallback, useState } from 'react';
import { Container } from './styles';

import NavigationButton from '../../components/NavigationBar/NavigationButton';
import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Button from '../../components/Button';
import SmallButton from '../../components/SmallButton';

const OrderData: React.FC = () => {
  const [actualStatus, setActualStatus] = useState(1);
  const [actualProcess, setActualProcess] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [previsionFinalDate, setPrevisionFinalDate] = useState('');
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
  const [grossValue, setGrossValue] = useState(1);
  const [netValue, setNetValue] = useState(1);

  const handleCreateOrder = useCallback(() => {
    const request = new XMLHttpRequest();

    request.open('POST', `http://localhost:8080/orders`, true);

    const order = {
      actual_status: actualStatus,
      actual_process: actualProcess,
      title,
      description,
      startDate,
      finalDate,
      previsionFinalDate,
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
    };

    console.log(order);

    request.setRequestHeader(`Content-Type`, `application/json`);
    request.send(JSON.stringify(order));

    alert('Pedido cadastrado.');
  }, [actualProcess, actualStatus, cep, city, complement, country, description, finalDate, grossValue, installationEnvironments, neighborhood, netValue, number, paymentMethod, previsionFinalDate, startDate, street, title, uf]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/" />
          <NavigationButton text="Usuários" toPage="/" />
          <NavigationButton text="Clientes" toPage="/" />
          <NavigationButton text="Pedidos" toPage="/" id="nav-link-selected" />
          <NavigationButton text="Instalações" toPage="/" />
          <NavigationButton text="Portfólio" toPage="/" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <form>
          <h1>Dados do Pedido</h1>

          <Select
            label="Status do Pedido"
            options={[
              { value: 1, description: 'Em andamento' },
              { value: 2, description: 'Finalizado' },
              { value: 3, description: 'Cancelado' },
            ]}
            onChange={(e) => setActualStatus(Number(e.target.value))}
          />
          <Select
            label="Processo Atual"
            options={[
              { value: 1, description: 'Iniciando' },
              { value: 2, description: 'Pedido na Fábrica' },
              { value: 3, description: 'Instalando' },
              { value: 4, description: 'Reunião com os Montadores' },
            ]}
            onChange={(e) => setActualProcess(Number(e.target.value))}
          />

          <div className="space-division">
            <SmallButton name="❮ Voltar" backgorundcolor="beige"/>
            <SmallButton name="Avançar ❯" backgorundcolor="green"/>
          </div>

          <Input
            label="Título"
            placeholder="Informe o título do pedido"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Descrição"
            placeholder="Informe a descrição do pedido"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Data de Início"
            placeholder="Informe a data de início"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="Data de Finalização"
            placeholder="Informe a data de finalização"
            type="date"
            onChange={(e) => setFinalDate(e.target.value)}
          />
          <Input
            label="Data de Entrega do Móvel"
            placeholder="Informe a data de entrega do móvel"
            type="date"
            onChange={(e) => setPrevisionFinalDate(e.target.value)}
          />

          <h1>Endereço</h1>
          <Input
            label="CEP"
            placeholder="Informe o CEP"
            onChange={(e) => setCep(e.target.value)}
          />

          <div className="space-division">
            <div className="x2">
              <Input
                label="Rua"
                placeholder="Informe a rua"
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="x1">
              <Input
                label="Número"
                placeholder="Informe o número"
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
          </div>

          <Input
            label="Complemento"
            placeholder="Informe o complemento"
            onChange={(e) => setComplement(e.target.value)}
          />
          <Input
            label="Bairro"
            placeholder="Informe o bairro"
            onChange={(e) => setNeighborhood(e.target.value)}
          />

          <div className="space-division">
            <div className="x1">
              <Select
                label="UF"
                options={[
                  { description: 'SP' },
                  { description: 'MG' },
                  { description: 'AM' },
                  { description: 'RS' },
                ]}
                onChange={(e) => setUF(e.target.value)}
              />
            </div>
            <div className="x2">
              <Select
                label="Cidade"
                options={[
                  { description: 'Franca' },
                  { description: 'São Paulo' },
                ]}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <Select
            label="País"
            options={[
              { description: 'Brasil' },
              { description: 'Estados Unidos' },
            ]}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Textarea
            label="Cômodos / Ambientes"
            placeholder="Descreva os cômodos e ambientes pra instalação"
            onChange={(e) => setInstallationEnvironments(e.target.value)}
          />

          <h1>Valores e Pagamento</h1>
          <Select
            label="Forma de Pagamento"
            options={[
              { description: 'Dinheiro' },
              { description: 'Cartão de Crédito' },
            ]}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Input
            label="Valor Bruto"
            placeholder="Informe o valor bruto"
            onChange={(e) => setGrossValue(Number(e.target.value))}
          />
          <Input
            label="Valor Líquido"
            placeholder="Informe o valor líquido"
            onChange={(e) => setNetValue(Number(e.target.value))}
          />

          <Button name="Salvar" onClick={handleCreateOrder} />
        </form>
      </main>
    </Container>
  );
};

export default OrderData;
