import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import { Container, Table } from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import NavigationBar from '../../components/NavigationBar';
import SearchBarButton from '../../components/SearchBarButton';
import api from '../../services/api';

interface IInstallationProps {
  id: string;
  order: {
    title: string;
  }
}

interface IAssessmentProps {
  id: string;
  cleaning_note: number;
  finish_note: number;
  customer_note: number;
  manager_note: number;
  loss_amount: number;
  comment: string;
  installation: IInstallationProps;
}

interface IAssessmentSelect {
  assessment: IAssessmentProps;
  selected: boolean;
}

// Página de listagem das avaliações
const AssessmentsList: React.FC = () => {
  const [assessments, setAssessments] = useState<IAssessmentSelect[]>([]);

  // Função para carregar as avaliações
  const handleLoadAssesments = useCallback(async () => {
    const { data: assessmentsList } = await api.get<IAssessmentProps[]>('/assessments');

    const assessmentsListWithSelectBox = assessmentsList.map(assessment => ({
      assessment,
      selected: false,
    }));

    setAssessments(assessmentsListWithSelectBox);
  }, []);

  // Função para apagar uma avaliação
  const handleDeleteAssessment = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar a avaliação
    const response = confirm('Você realmente deseja apagar a avaliação?');

    if(!response) {
      return;
    }

    await api.delete(`/assessments/${id}`);

    // Recarregando a lista das avaliações
    handleLoadAssesments();
  }, [handleLoadAssesments]);

  return (
    <Container onLoad={handleLoadAssesments}>
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
                assessments.length > 0
                  ? assessments.map(({ selected, assessment }) => (
                    <tr key={assessment.id}>
                      <td className="text-center td-id td-x1">
                        <CheckBox name="markup" className="checkbox" defaultChecked={selected} />
                      </td>
                      <td className="text-left td-x3">
                        <Link to={`/installation-data/${assessment.installation.id}`}>
                          {assessment.installation.order.title}
                        </Link>
                      </td>
                      <td className="text-center td-x2">
                        <Link to={`/installation-data/${assessment.installation.id}`}>
                          <span>
                            { (assessment.cleaning_note + assessment.finish_note + assessment.customer_note + assessment.manager_note) / 4 }
                          </span>
                        </Link>
                        <button
                          className="ic-remove"
                          onClick={() => handleDeleteAssessment(assessment.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                  : <tr><td colSpan={3}><p id="empty-assessments-list">Sem avaliações...</p></td></tr>
              }
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
}

export default AssessmentsList;
