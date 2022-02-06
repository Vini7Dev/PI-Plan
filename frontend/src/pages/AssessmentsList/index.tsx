import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { Form } from '@unform/web';

import api from '../../services/api';
import { Container, Table, ModalContent } from './styles';

import Loading from '../../components/Loading';
import ModalView from '../../components/ModalView';
import Header from '../../components/Header';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import NavigationBar from '../../components/NavigationBar';
import SearchBarButton from '../../components/SearchBarButton';
import Input from '../../components/Input';

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

interface ITotOfNotesForAVG {
  totOfSelectedAssessments: number;
  cleaningNote: number;
  finishNote: number;
  customerNote: number;
  managerNote: number;
  lossAmount: number;
}

// Página de listagem das avaliações
const AssessmentsList: React.FC = () => {
  const [loadingAssessments, setLoadingAssessments] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [assessments, setAssessments] = useState<IAssessmentSelect[]>([]);
  const [totOfNotesForAVG, setTotOfNotesForAVG] = useState<ITotOfNotesForAVG>({} as ITotOfNotesForAVG);

  // Função para mostrar ou esconder o popup
  const toggleShowPopup = useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  // Função para limpar a seleção das avaliações
  const handleDesableAllMarkupAssessments = useCallback(() => {
    const updatedAssessments = assessments.map(({ assessment }) => ({
      assessment,
      selected: false,
    }));

    setAssessments(updatedAssessments);
  }, [assessments]);

  // Função para carregar as avaliações
  const handleLoadAssesments = useCallback(async () => {
    setLoadingAssessments(true);

    // Limpando a seleção das avaliações
    handleDesableAllMarkupAssessments();

    try {
      const { data: assessmentsList } = await api.get<IAssessmentProps[]>(`/assessments${searchString ? `?search_string=${searchString}` : ''
        }`);

      const assessmentsListWithSelectBox = assessmentsList.map(assessment => ({
        assessment,
        selected: false,
      }));

      setAssessments(assessmentsListWithSelectBox);
    } catch (err) {
      console.log(err);
    }

    setLoadingAssessments(false);
  }, [searchString]);

  // Função para apagar uma avaliação
  const handleDeleteAssessment = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar a avaliação
    const response = confirm('Você realmente deseja apagar a avaliação?');

    if (!response) {
      return;
    }

    await api.delete(`/assessments/${id}`);

    // Recarregando a lista das avaliações
    handleLoadAssesments();
  }, [handleLoadAssesments]);

  // Função para alterar a seleção da avaliação quando o usuário clicar na checkbox
  const toggleAssessmentSelect = useCallback((id: string) => {
    const updatedAssessments = assessments;

    const index = updatedAssessments.findIndex(({ assessment }) => assessment.id === id);

    updatedAssessments[index].selected = !updatedAssessments[index].selected;

    setAssessments(updatedAssessments)
  }, [assessments]);

  // Função para caluclar a média das avaliações selecionadas
  const handleCalculeAvgFromSelectedAssessments = useCallback(() => {
    // Iniciando a soma das notas em zero
    const sumOfNotes = {
      totOfSelectedAssessments: 0,
      cleaningNote: 0,
      finishNote: 0,
      customerNote: 0,
      managerNote: 0,
      lossAmount: 0,
    };

    // Para cada avaliação selecionada, somar as notas
    assessments.forEach(({ selected, assessment }) => {
      if (selected) {
        sumOfNotes.totOfSelectedAssessments += 1;
        sumOfNotes.cleaningNote += assessment.cleaning_note;
        sumOfNotes.finishNote += assessment.finish_note;
        sumOfNotes.customerNote += assessment.customer_note;
        sumOfNotes.managerNote += assessment.manager_note;
        sumOfNotes.lossAmount += assessment.loss_amount;
      }
    });

    // Caso nenhuma avaliação tenha sido selecionada, cancelar a operação
    if (sumOfNotes.totOfSelectedAssessments === 0) {
      return;
    }

    // Salvando a soma das notas
    setTotOfNotesForAVG(sumOfNotes);

    // Abrindo o popup com o resultado
    toggleShowPopup();
  }, [assessments, toggleShowPopup]);

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
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onClickInSearchButton={handleLoadAssesments}
          />
        </Header>

        <div id="notes-calculator">
          <Button
            name="Calcular Média das Notas Selecionadas"
            onClick={handleCalculeAvgFromSelectedAssessments}
            size="small"
          />
        </div>

        <div id="table-border">
          <Table>
            <thead>
              <tr>
                <th className="start-border-r td-x1">
                  {null}
                </th>
                <th className="text-left td-x3">Título do Pedido</th>
                <th className="end-border-r td-x2">Média das Notas</th>
              </tr>
            </thead>
            <tbody>
              {
                loadingAssessments
                  ? <tr><td colSpan={3}><p id="empty-assessments-list"><Loading /></p></td></tr>
                  : assessments.length > 0
                    ? assessments.map(({ selected, assessment }) => (
                      <tr key={assessment.id}>
                        <td className="text-center td-id td-x1">
                          <CheckBox
                            name="markup"
                            className="checkbox"
                            defaultChecked={selected}
                            onClick={() => toggleAssessmentSelect(assessment.id)}
                          />
                        </td>
                        <td className="text-left td-x3">
                          <Link to={`/installation-data/${assessment.installation.id}`}>
                            {assessment.installation.order.title}
                          </Link>
                        </td>
                        <td className="text-center td-x2">
                          <Link to={`/installation-data/${assessment.installation.id}`}>
                            <span>
                              {(assessment.cleaning_note + assessment.finish_note + assessment.customer_note + assessment.manager_note) / 4}
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
      {
        showPopup && <ModalView isOpen={showPopup} title="Média das notas">
          <ModalContent>
            <Form onSubmit={() => { /** */ }}>
              <div className="space-division">
                <div className="x2">
                  <Input
                    label="Limpeza/Finalização"
                    name="cleaning_note"
                    placeholder="0-10"
                    value={
                      (totOfNotesForAVG.cleaningNote / totOfNotesForAVG.totOfSelectedAssessments).toFixed(2)
                    }
                    style={{ textAlign: 'center' }}
                  />
                  <Input
                    label="Cliente"
                    name="customer_note"
                    placeholder="0-10"
                    value={
                      (totOfNotesForAVG.customerNote / totOfNotesForAVG.totOfSelectedAssessments).toFixed(2)
                    }
                    style={{ textAlign: 'center' }}
                  />
                </div>
                <div className="x-divisor" />
                <div className="x2">
                  <Input
                    label="Acabamento"
                    name="finish_note"
                    placeholder="0-10"
                    value={
                      (totOfNotesForAVG.finishNote / totOfNotesForAVG.totOfSelectedAssessments).toFixed(2)
                    }
                    style={{ textAlign: 'center' }}
                  />
                  <Input
                    label="Gerência"
                    name="manager_note"
                    placeholder="0-10"
                    value={
                      (totOfNotesForAVG.managerNote / totOfNotesForAVG.totOfSelectedAssessments).toFixed(2)
                    }
                    style={{ textAlign: 'center' }}
                  />
                </div>
              </div>
              <Input
                label="Total de Prejuízo"
                name="loss_amount"
                placeholder="R$0,00"
                value={totOfNotesForAVG.lossAmount}
              />

              <div className="modal-space-divisor" />

              <Button
                name="Fechar"
                type="button"
                onClick={toggleShowPopup}
              />
            </Form>
          </ModalContent>
        </ModalView>
      }
    </Container>
  );
}

export default AssessmentsList;
