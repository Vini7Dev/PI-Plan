import React, { useState, useCallback, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ChechBox from '../../components/CheckBox';
import Header from '../../components/Header';

interface ICustomerProps{
  id?: number;
  warn_contact: boolean;
  name: string;
  cellphone: string;
  last_contact: string;
  next_contact: string;
  cpf?: string;
  cnpj?: string;
}

// Página para criar um cliente ou apresentar os seus dados
const CustomerData: React.FC = () =>{
  const location = useLocation();

  const [sendContactAlert, setSendContactAlert] = useState(false);

  // Caso exista o id do cliente na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const clientId = location.pathname.split('/client-data/')[1];
  }, [location]);

  // Função para criar um cliente ou atualizar os seus dados
  const handleClientData = useCallback(function(){
    //
  },[]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={2} />
      </div>

      <main>
        <section id="form-area">
          <Header title="Cadastro de Cliente" />

          <Form onSubmit={handleClientData}>
            <Input
            label="Nome"
            name="name"
            placeholder="Digíte o Nome"
            />

            <Input
            label="Telefone"
            name="cellphone"
            placeholder="Digíte o Telefone"
            />

            <Input
            label="CPF/CNPJ"
            name="document"
            placeholder="Digíte o CPF ou o CNPJ"
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
