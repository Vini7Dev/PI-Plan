import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import parseBrDateStringToDate from '../../utils/parseBrDateStringToDate';
import {
  Container, AddAssemblersArea, ModalContent, AssessmentArea
} from './styles';

import Loading from '../../components/Loading';
import NavigationBar from '../../components/NavigationBar';
import StatusButton from '../../components/StatusButton';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ModalView from '../../components/ModalView';

interface IAssembler {
  id: string;
  name: string;
}

interface IAssemblerInstallation {
  assembler_id: string;
  commission_percentage: number;
  assembler: IAssembler;
}

interface IAssessmentProps {
  id: string;
  cleaning_note: number;
  finish_note: number;
  customer_note: number;
  manager_note: number;
  loss_amount: number;
  comment: string;
}

interface IInstallationProps {
  id?: number;
  start_date: string;
  completion_forecast: string;
  end_date?: string;
  price: string;
  assessment: IAssessmentProps;
  assemblers_installation: IAssemblerInstallation[];
}

// Página para criar uma instalação ou apresentar os seus dados
const InstallationData: React.FC = () => {
  const popupFormRef = useRef<FormHandles>(null);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [loadingData, setLoadingData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalContentType, setModalContentType] = useState('add_assembler');
  const [installationData, setInstallationData] = useState<IInstallationProps>({} as IInstallationProps);
  const [assemblersInstallation, setAssemblersInstallation] = useState<IAssemblerInstallation[]>([]);
  const [assemblersList, setAssemblersList] = useState<IAssembler[]>([]);
  const [installationId, setInstallationId] = useState('');
  const [orderId, setOrderId] = useState('');

  // Caso exista o id da instalação na rota, buscar os seus dados no banco de dados
  const loadInstallationData = useCallback(async () => {
    setLoadingData(true);

    try {
      const installationIdFromPath = location.pathname.split('/installation-data/')[1];
      const orderIdFromPath = location.search.split('=')[1];

      if (installationIdFromPath) {
        const { data: installationDataResponse } = await api.get<IInstallationProps>(`/installations/${installationIdFromPath}`);

        setInstallationData(installationDataResponse as IInstallationProps);
        setAssemblersInstallation(installationDataResponse.assemblers_installation);
        setInstallationId(installationIdFromPath);
      } else {
        setInstallationData({} as IInstallationProps);
        setAssemblersInstallation([]);
        setInstallationId('');
      }

      setOrderId(orderIdFromPath);
    } catch (err) {
      console.log(err);
    }

    setLoadingData(false)
  }, []);

  useEffect(() => {
    loadInstallationData();
  }, [loadInstallationData]);

  // Função para cadastrar uma nova instalação ou para atualizar os dados de uma já existente
  const handleSubmitForm = useCallback(async (data) => {
    try {
      // Confirmando se foram adicionados montadores
      if (assemblersInstallation.length === 0) {
        alert('Adicione pelo menos um montador!');

        return;
      }
      setLoadingData(true);

      // Criando o modelo para validação do formulário
      const shape = Yup.object().shape({
        start_date: Yup.string().length(10, 'Informe uma data válida!').required('A data de início é obrigatória!'),
        end_date: Yup.string().length(10, 'Informe uma data válida!'),
        completion_forecast: Yup.string().length(10, 'Informe uma data válida!').required('A previsão de finalização é obrigatória!'),
        price: Yup.number().required('Informe o valor pago pela instalação!'),
        assemblers_installation: Yup.array().min(1, 'Informe ao mínimo um montador!').of(
          Yup.object().shape({
            assembler_id: Yup.string().uuid('Informe um uuid válido!').required('O id do montador é obrigatório!'),
            commission_percentage: Yup.number().min(0, 'Informe no mínimo 0% de comissão!'),
          }),
        ),
      });

      // Criando o objeto com os dados da instalação
      const installationDataToRequest = {
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        completion_forecast: data.completion_forecast,
        price: Number(data.price),
        assemblers_installation: assemblersInstallation.map(({ assembler_id, commission_percentage }) => ({
          assembler_id,
          commission_percentage: Number(commission_percentage),
        })),
      }

      // Validando o formulário
      await shape.validate(installationDataToRequest, { abortEarly: false });

      // Cadastrando ou atualizando os dados
      if (installationId) {
        // Atualizando os dados da instalação
        await api.put(`/installations/${installationId}`, installationDataToRequest);
      } else {
        // Adicionando o id do pedido
        Object.assign(installationDataToRequest, { order_id: orderId });

        // Cadastrando uma nova instalação
        await api.post('/installations', installationDataToRequest);
      }

      // Navegando para a tela de listagem das instalações
      history.push('/installations-list');
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
  }, [assemblersInstallation, installationId, orderId, history]);

  // Função para carregar os montadores cadastrados na aplicação
  const handleLoadAssemblers = useCallback(async () => {
    setLoadingData(true);

    try {
      const { data: assemblersListResponse } = await api.get<IAssembler[]>('/assemblers');

      const assemblersListWithoutAssemblersInUse = assemblersListResponse.filter(assembler => {
        return assemblersInstallation.findIndex(asmb => asmb.assembler_id === assembler.id) === -1;
      });

      setAssemblersList(assemblersListWithoutAssemblersInUse);
    } catch (err) {
      console.log(err);
    }

    setLoadingData(false);
  }, [assemblersInstallation]);

  // Função para mostrar ou esconder o modal para adicionar montador
  const toggleShowPopup = useCallback((modalContentTypeShow: string) => {
    // Definindo o tipo do conteúdo presente no modal
    setModalContentType(modalContentTypeShow);

    // Caso tenha aberto o popup, carregar os montadores cadastrados
    if (!showPopup) {
      handleLoadAssemblers();
    }

    setShowPopup(!showPopup);
  }, [showPopup, handleLoadAssemblers]);

  // Função para adicionar um montador na instalação
  const handleAddAssembler = useCallback(async (data) => {
    try {
      // Separando o id e o nome do montador
      const [assembler_id, name] = data.assembler.split(' ');

      // Criando o objeto de validação do formulário
      const shape = Yup.object().shape({
        assembler_id: Yup.string().uuid('Montador inválido!').required('O montador é obrigatório!'),
        commission_percentage: Yup.number().min(0, 'Informe no mínimo 0!').required('A comissão é obrigatória!'),
      });

      // Validando o formulário
      await shape.validate({
        assembler_id,
        commission_percentage: data.commission_percentage,
      }, { abortEarly: false });

      // Criando o objeto do montador + sua comissão
      const assemblerInstallationObject: IAssemblerInstallation = {
        assembler_id,
        commission_percentage: data.commission_percentage,
        assembler: {
          id: assembler_id,
          name,
        }
      }

      // Adicionando o montador na lista
      setAssemblersInstallation([...assemblersInstallation, assemblerInstallationObject]);

      // Fechando o popup
      toggleShowPopup('');
    } catch (error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        if (popupFormRef.current) {
          popupFormRef.current.setErrors(errors);
        }
      }
    }
  }, [assemblersInstallation, toggleShowPopup]);

  // Função para remover um montador da instalação
  const handleRemoveAssembler = useCallback((index: number) => {
    // Verificando se existe o index do montador na lista
    if (!assemblersInstallation[index]) {
      return;
    }

    // Removendo o montador e atualizando a lista
    const [...assemblersInstallationUpdated] = assemblersInstallation;

    assemblersInstallationUpdated.splice(index, 1);

    setAssemblersInstallation(assemblersInstallationUpdated);
  }, [assemblersInstallation]);

  // Função para cadastrar a avaliação
  const handleSubmitAssessment = useCallback(async (data) => {
    try {
      // Criando o modelo para validação do formulário
      const shape = Yup.object().shape({
        cleaning_note: Yup.number().min(0, 'Mínimo de 0!').max(10, 'Máximo de 10!').required('A nota é obrigatória!'),
        finish_note: Yup.number().min(0, 'Mínimo de 0!').max(10, 'Máximo de 10!').required('A nota é obrigatória!'),
        customer_note: Yup.number().min(0, 'Mínimo de 0!').max(10, 'Máximo de 10!').required('A nota é obrigatória!'),
        manager_note: Yup.number().min(0, 'Mínimo de 0!').max(10, 'Máximo de 10!').required('A nota é obrigatória!'),
        loss_amount: Yup.number().min(0, 'Mínimo de 0!').required('O valor do prejuízo é obrigatório!'),
        comment: Yup.string().default(''),
      });

      // Validando o formulário
      await shape.validate(data, { abortEarly: false });

      // Enviando os dados ao backend para criar / atualizar a avaliação
      if (installationData.assessment) {
        await api.put(`/assessments/${installationData.assessment.id}`, data);
      } else {
        Object.assign(data, {
          installation_id: installationId,
        })

        await api.post(`/assessments`, data);
      }

      // Recarregando os dados do pedido
      loadInstallationData();

      // Fechando o popup
      toggleShowPopup('');
    } catch (error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        if (popupFormRef.current) {
          popupFormRef.current.setErrors(errors);
        }
      }
    }
  }, [installationData, installationId, loadInstallationData, toggleShowPopup]);

  // Função para apagar a avaliação da instalação
  const handleDeleteAssessment = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar a avaliação
    const response = confirm('Você realmente deseja apagar a avaliação?');

    if (!response) {
      return;
    }

    await api.delete(`/assessments/${id}`);

    // Recarregando os dados da instalação
    loadInstallationData();
  }, [loadInstallationData]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={4} />
      </div>

      <div id="content-area">
        <main id="form-area">
          <Header title="Cadastro de Instalação" />

          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <StatusButton
              buttonText="Finalizar Instalação"
              buttonColor="green"
              status="Em Andamento"
            />

            <Input
              autoFocus
              label="Data de Início"
              name="start_date"
              placeholder="Informe a data de início"
              type="date"
              defaultValue={installationData.start_date}
            />

            <Input
              label="Previsão da Finalização"
              name="completion_forecast"
              placeholder="Informe a data prevista para a finalização"
              type="date"
              defaultValue={installationData.completion_forecast}
            />

            <Input
              label="Data de Finalização"
              name="end_date"
              placeholder="Informe a data de finalização"
              type="date"
              defaultValue={installationData.end_date || ''}
            />

            <Input
              label="Valor da Instalação"
              name="price"
              placeholder="R$ 0,00"
              type="number"
              defaultValue={installationData.price}
            />

            <h2>Montadores</h2>

            <AddAssemblersArea>
              {
                assemblersInstallation.length > 0
                  ? (assemblersInstallation.map((assemblerInstallation, index) => (
                    <div key={assemblerInstallation.assembler_id}>
                      <div className="space-division">
                        <div className="x2">
                          <div className="assembler-info-div">
                            <span>Montador</span>
                            <p>{assemblerInstallation.assembler && assemblerInstallation.assembler.name}</p>

                            <button
                              className="remove-assembler-btn"
                              type="button"
                              onClick={() => handleRemoveAssembler(index)}
                            >
                              <FiX size={25} />
                            </button>
                          </div>
                        </div>
                        <div className="x-divisor" />
                        <div className="x1">
                          <div className="assembler-info-div">
                            <span>Comissão</span>
                            <p className="text-center">{assemblerInstallation.commission_percentage}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )))
                  : null
              }

              <Button
                name="Adicionar Montador"
                color="brown"
                onClick={() => toggleShowPopup('add_assembler')}
              />
            </AddAssemblersArea>

            <Button name="Salvar" type="submit" />
          </Form>

          <AssessmentArea>
            <div id="assessment-title-area">
              <h3>Avaliação</h3>

              {installationData.assessment &&
                <div id="assessment-actions-buttons">
                  <button
                    className="action-button edit-button"
                    onClick={() => toggleShowPopup('edit_assessment')}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteAssessment(installationData.assessment.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              }
            </div>

            {
              installationData.assessment
                ? (<div id="assessment-content">
                  <div id="assessment-table">
                    <div className="assessment-row">
                      <span className="tltr-border-radius">Houve atrazo?</span>
                      <p className="tr-border-radius">{
                        installationData.end_date
                          && parseBrDateStringToDate(installationData.end_date) > parseBrDateStringToDate(installationData.completion_forecast)
                          ? 'Sim' : 'Não'
                      }</p>
                    </div>
                    <div className="assessment-row">
                      <span>Nota de Limpeza e Finalização</span>
                      <p>
                        {installationData.assessment && installationData.assessment.cleaning_note}
                      </p>
                    </div>
                    <div className="assessment-row">
                      <span>Nota de Acabamento</span>
                      <p>
                        {installationData.assessment && installationData.assessment.finish_note}
                      </p>
                    </div>
                    <div className="assessment-row">
                      <span>Nota do Cliente</span>
                      <p>
                        {installationData.assessment && installationData.assessment.customer_note}
                      </p>
                    </div>
                    <div className="assessment-row">
                      <span className="bltr-border-radius">Nota da Gerência</span>
                      <p className="br-border-radius">
                        {installationData.assessment && installationData.assessment.manager_note}
                      </p>
                    </div>
                  </div>
                  <div id="lost-amount-and-comments">
                    <div>
                      <span>Valor em Prejuízo</span>
                      <p className="text-right">
                        {installationData.assessment && installationData.assessment.loss_amount}
                      </p>
                    </div>
                    <div>
                      <span>Comentários</span>
                      <p>
                        {installationData.assessment && installationData.assessment.comment}
                      </p>
                    </div>
                  </div>
                </div>)
                : <Button
                  name="Cadastrar Avaliação"
                  size="small"
                  onClick={
                    () => installationId
                      ? toggleShowPopup('add_assessment')
                      : alert('Instalação não cadastrada!')
                  }
                  active={!!installationId}
                />
            }
          </AssessmentArea>
        </main>
      </div>
      {
        showPopup && <ModalView isOpen={showPopup} title={
          modalContentType === 'add_assembler' ? 'Adicionar Montador' : 'Avaliação'
        }>
          <ModalContent>
            <Form
              onSubmit={modalContentType === 'add_assembler'
                ? handleAddAssembler
                : handleSubmitAssessment
              }
              ref={popupFormRef}
            >
              {
                modalContentType === 'add_assembler'
                  ? <div className="space-division">
                    <div className="x2">
                      <Select
                        label="Montador"
                        name="assembler"
                        options={
                          assemblersList.length > 0
                            ? assemblersList.map(assembler => (
                              { value: `${assembler.id} ${assembler.name}`, description: assembler.name }
                            ))
                            : [{ value: 'invalid', description: 'Nenhum montador encontrado...' }]
                        }
                      />
                    </div>
                    <div className="x-divisor" />
                    <div className="x1">
                      <Input
                        label="Comissão"
                        name="commission_percentage"
                        placeholder="--%"
                        type="number"
                        min={0}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  : <div>
                    <h4>Notas</h4>
                    <div className="space-division">
                      <div className="x2">
                        <Input
                          label="Limpeza/Finalização"
                          name="cleaning_note"
                          placeholder="0-10"
                          type="number"
                          min={0}
                          max={10}
                          defaultValue={
                            installationData.assessment ? installationData.assessment.cleaning_note : 0
                          }
                          style={{ textAlign: 'center' }}
                        />
                        <Input
                          label="Cliente"
                          name="customer_note"
                          placeholder="0-10"
                          type="number"
                          min={0}
                          max={10}
                          defaultValue={
                            installationData.assessment ? installationData.assessment.customer_note : 0
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
                          type="number"
                          defaultValue={
                            installationData.assessment ? installationData.assessment.finish_note : 0
                          }
                          style={{ textAlign: 'center' }}
                        />
                        <Input
                          label="Gerência"
                          name="manager_note"
                          placeholder="0-10"
                          type="number"
                          defaultValue={
                            installationData.assessment ? installationData.assessment.manager_note : 0
                          }
                          style={{ textAlign: 'center' }}
                        />
                      </div>
                    </div>
                    <Input
                      label="Prejuízo na Obra"
                      name="loss_amount"
                      placeholder="R$0,00"
                      defaultValue={
                        installationData.assessment ? installationData.assessment.loss_amount : 0
                      }
                    />

                    <Input
                      label="Comentários"
                      name="comment"
                      placeholder="Deixe algum comentário sobre a instalação..."
                      defaultValue={
                        installationData.assessment ? installationData.assessment.comment : ''
                      }
                    />
                  </div>
              }

              <Button name={modalContentType === 'add_assembler' ? 'Adicionar' : 'Salvar'} type="submit" />

              <div className="modal-space-divisor" />

              <Button
                name="Fechar"
                color="white"
                size="small"
                type="button"
                onClick={() => toggleShowPopup('')}
              />
            </Form>
          </ModalContent>
        </ModalView>
      }

      <ModalView title="" isOpen={loadingData} zIndex={2}>
        <Loading />
      </ModalView>
    </Container>
  );
};

export default InstallationData;
