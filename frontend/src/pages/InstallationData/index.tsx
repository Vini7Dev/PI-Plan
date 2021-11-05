import React, { useCallback, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Form } from '@unform/web';

import api from '../../services/api';
import {
  Container, AddAssemblersArea, ModalContent, AssessmentArea
} from './styles';

import NavigationBar from '../../components/NavigationBar';
import StatusButton from '../../components/StatusButton';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ModalView from '../../components/ModalView';
import parseBrDateStringToDate from '../../utils/parseBrDateStringToDate';

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
  const [showPopup, setShowPopup] = useState(false);
  const [installationData, setInstallationData] = useState<IInstallationProps>({} as IInstallationProps);
  const [assemblersInstallation, setAssemblersInstallation] = useState<IAssemblerInstallation[]>([]);
  const [assemblersList, setAssemblersList] = useState<IAssembler[]>([]);
  const [installationId, setInstallationId] = useState('');
  const [orderId, setOrderId] = useState('');

  // Caso exista o id da instalação na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const loadInstallationData = async () => {
      const installationIdFromPath = location.pathname.split('/installation-data/')[1];
      const orderIdFromPath = location.search.split('=')[1];

      if(installationIdFromPath) {
        const { data: installationDataResponse } = await api.get<IInstallationProps>(`/installations/${installationIdFromPath}`);

        setInstallationData(installationDataResponse as IInstallationProps);
        setAssemblersInstallation(installationDataResponse.assemblers_installation);
        setInstallationId(installationIdFromPath);
        setOrderId(orderIdFromPath);
      } else {
        setInstallationData({} as IInstallationProps);
        setAssemblersInstallation([]);
        setInstallationId('');
        setOrderId('');
      }
    }

    loadInstallationData();
  }, []);

  // Função para carregar os montadores cadastrados na aplicação
  const handleLoadAssemblers = useCallback(async () => {
    const { data: assemblersListResponse } = await api.get<IAssembler[]>('/assemblers');

    const assemblersListWithoutAssemblersInUse = assemblersListResponse.filter(assembler => {
      return assemblersInstallation.findIndex(asmb => asmb.assembler_id === assembler.id) === -1;
    });

    setAssemblersList(assemblersListWithoutAssemblersInUse);
  }, [assemblersInstallation]);

  // Função para mostrar ou esconder o modal para adicionar montador
  const toggleShowPopup = useCallback(() => {
    // Caso tenha aberto o popup, carregar os montadores cadastrados
    if(!showPopup) {
      handleLoadAssemblers();
    }

    setShowPopup(!showPopup);
  }, [showPopup, handleLoadAssemblers]);

  // Função para adicionar um montador na instalação
  const handleAddAssembler = useCallback((data) => {
    // Separando o id e o nome do montador
    const [assembler_id, name] = data.assembler.split(' ');

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
    toggleShowPopup();
  }, [assemblersInstallation, toggleShowPopup]);

  // Função para remover um montador da instalação
  const handleRemoveAssembler = useCallback((index: number) => {
    // Verificando se existe o index do montador na lista
    if(!assemblersInstallation[index]) {
      return;
    }

    // Removendo o montador e atualizando a lista
    const [...assemblersInstallationUpdated] = assemblersInstallation;

    assemblersInstallationUpdated.splice(index, 1);

    setAssemblersInstallation(assemblersInstallationUpdated);
  }, [assemblersInstallation]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={4} />
      </div>

      <div id="content-area">
        <main id="form-area">
          <Header title="Cadastro de Instalação" />

          <Form onSubmit={() => {
            //
          }}>
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
                onClick={toggleShowPopup}
              />
            </AddAssemblersArea>

            <AssessmentArea>
              <h3>Avaliação</h3>

              <div id="assessment-content">
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
                      {installationData.assessment &&installationData.assessment.cleaning_note}
                    </p>
                  </div>
                  <div className="assessment-row">
                    <span>Nota de Acabamento</span>
                    <p>
                      {installationData.assessment &&installationData.assessment.finish_note}
                    </p>
                  </div>
                  <div className="assessment-row">
                    <span>Nota do Cliente</span>
                    <p>
                      {installationData.assessment &&installationData.assessment.customer_note}
                    </p>
                  </div>
                  <div className="assessment-row">
                    <span className="bltr-border-radius">Nota da Gerência</span>
                    <p className="br-border-radius">
                      {installationData.assessment &&installationData.assessment.manager_note}
                    </p>
                  </div>
                </div>
                <div id="lost-amount-and-comments">
                  <div>
                    <span>Valor em Prejuízo</span>
                    <p>{installationData.assessment &&installationData.assessment.loss_amount}</p>
                  </div>
                  <div>
                    <span>Comentários</span>
                    <p>{installationData.assessment &&installationData.assessment.comment}</p>
                  </div>
                </div>
              </div>
            </AssessmentArea>

            <Button name="Salvar" type="submit" />
          </Form>
        </main>
      </div>
      {
        showPopup && <ModalView isOpen={showPopup} title="Adicionar Montador" >
          <ModalContent>
            <Form onSubmit={handleAddAssembler}>
              <div className="space-division">
                <div className="x2">
                  <Select
                    label="Montador"
                    name="assembler"
                    options={
                      assemblersList.length > 0
                      ? assemblersList.map(assembler => (
                        { value: `${assembler.id} ${assembler.name}`, description: assembler.name }
                      ))
                      : [{ value: 'invalid' , description: 'Nenhum montador encontrado...' }]
                    }
                  />
                </div>
                <div className="x-divisor" />
                <div className="x1">
                  <Input
                    label="Comissão"
                    name="commission_percentage"
                    placeholder="10%"
                  />
                </div>
              </div>
              <Button name="Adicionar" type="submit" />

              <div className="modal-space-divisor" />

              <Button
                name="Fechar"
                color="white"
                size="small"
                type="button"
                onClick={toggleShowPopup}
              />
            </Form>
          </ModalContent>
        </ModalView>
      }
    </Container>
  );
};

export default InstallationData;
