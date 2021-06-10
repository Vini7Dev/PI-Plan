import React from 'react';
import { Container } from './styles';

import NavigationButton from '../../components/NavigationBar/NavigationButton';
import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Button from '../../components/Button';
import SmallButton from '../../components/SmallButton';

const OrderData: React.FC = () => {
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
            label="Processo Atual"
            options={[
              'Iniciando',
              'Pedido na fábrica',
              'Instalando',
              'Pedido Finalizado',
            ]}
          />
          <div className="space-division">
            <SmallButton name="❮ Voltar" backgorundcolor="beige"/>
            <SmallButton name="Avançar ❯" backgorundcolor="green"/>
          </div>

          <Input label="Título" placeholder="Informe o título do pedido" />
          <Textarea
            label="Descrição"
            placeholder="Informe a descrição do pedido"
          />

          <h1>Endereço</h1>
          <Input label="CEP" placeholder="Informe o CEP" />

          <div className="space-division">
            <div className="x2">
              <Input label="Rua" placeholder="Informe a rua" />
            </div>
            <div className="x1">
              <Input label="Número" placeholder="Informe o número" />
            </div>
          </div>

          <Input label="Complemento" placeholder="Informe o complemento" />
          <Input label="Bairro" placeholder="Informe o bairro" />

          <div className="space-division">
            <div className="x1">
              <Select label="UF" options={['SP', 'MG', 'RS', 'AM']} />
            </div>
            <div className="x2">
              <Select label="Cidade" options={['Franca', 'São Paulo']} />
            </div>
          </div>

          <Textarea
            label="Cômodos / Ambientes"
            placeholder="Descreva os cômodos e ambientes pra instalação"
          />

          <h1>Valores e Pagamento</h1>
          <Select
            label="Forma de Pagamento"
            options={['Dinheiro', 'Cartão de Crédito']}
          />
          <Input label="Valor Bruto" placeholder="Informe o valor bruto" />
          <Input label="Valor Líquido" placeholder="Informe o valor líquido" />

          <Button name="Salvar" />
        </form>
      </main>
    </Container>
  );
};

export default OrderData;
