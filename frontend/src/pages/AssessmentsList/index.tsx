import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Container, Table } from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import NavigationBar from '../../components/NavigationBar';
import SearchBarButton from '../../components/SearchBarButton';

interface IAssessmentProps {
  id: string;
  order_title: string;
  cleaning_note: number;
  finish_note: number;
  customer_note: number;
  manager_note: number;
  loss_amount: number;
  comment: string;
}

const AssessmentsList: React.FC = () => {
  const [assessments, setAssessments] = useState<IAssessmentProps[]>([
    { id: '1', order_title: 'Título 1', cleaning_note: 10, finish_note: 10, customer_note: 10, manager_note: 10, loss_amount: 0, comment: 'Comentários...'},
    { id: '2', order_title: 'Título 2', cleaning_note: 9, finish_note: 9, customer_note: 9, manager_note: 9, loss_amount: 0, comment: 'Comentários...'},
    { id: '3', order_title: 'Título 3', cleaning_note: 10, finish_note: 10, customer_note: 10, manager_note: 5, loss_amount: 0, comment: 'Comentários...'},
    { id: '4', order_title: 'Título 4', cleaning_note: 5, finish_note: 5, customer_note: 5, manager_note: 5, loss_amount: 0, comment: 'Comentários...'},
    { id: '5', order_title: 'Título 5', cleaning_note: 4, finish_note: 4, customer_note: 4, manager_note: 4, loss_amount: 0, comment: 'Comentários...'},
  ]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={5} />
      </div>

      <main id="table-area">
        <Header title="Avaliações">
          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Procure por uma avaliação"
            onClickInSearchButton={() => {
              //
            }}
          />
        </Header>

        <div id="notes-calculator">
          <Button name="Calcular Média das Notas Selecionadas" />
        </div>

        <div id="table-border">
          <Table>
            <thead>
              <tr>
                <th className="start-border-r td-x1">
                  <button>Selecionar Todas</button>
                </th>
                <th className="text-left td-x3">Título do Pedido</th>
                <th className="end-border-r td-x2">Média das Notas</th>
              </tr>
            </thead>
            <tbody>
              {
                assessments.map(({ id, order_title, cleaning_note, finish_note, customer_note, manager_note }) => (
                  <tr key={id}>
                    <td className="text-center td-id td-x1">
                      <CheckBox name="markup" className="checkbox" />
                    </td>
                    <td className="text-left td-x3">
                      {order_title}
                    </td>
                    <td className="text-center td-x2">
                      <span>
                        { (cleaning_note + finish_note + customer_note + manager_note) / 4 }
                      </span>
                      <button className="ic-remove">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
}

export default AssessmentsList;
