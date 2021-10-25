import React, { useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';

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

interface IAssemblerInstallation {
  assembler_id: string;
  comission_percentage: number;
}

interface IInstallationProps {
  id?: number;
  start_date: string;
  completion_forecast: string;
  end_date?: string;
  price: string;
  assemblers: IAssemblerInstallation[];
}

const InstallationData: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const toggleShowPopup = useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={4} />
      </div>

      <main id="form-area">
        <Header title="Cadastro de Instalação" />

        <form>
          <StatusButton
            buttonText="Finalizar Instalação"
            buttonColor="green"
            status="Em Andamento"
          />

          <Select
            autoFocus
            label="Status da Instalação"
            options={[
              { value: 1, description: 'Em andamento' },
              { value: 2, description: 'Finalizado' },
              { value: 3, description: 'Cancelado' },
            ]}
          />

          <Input
            label="Data de Início"
            placeholder="Informe a data de início"
            type="date"
          />

          <Input
            label="Previsão da Finalização"
            placeholder="Informe a data prevista para a finalização"
            type="date"
          />

          <Input
            label="Data de Finalização"
            placeholder="Informe a data de finalização"
            type="date"
          />

          <Input
            label="Valor da Instalação"
            placeholder="R$ 0,00"
            type="date"
          />

          <h2>Montadores</h2>

          <AddAssemblersArea>
            <div>
              <div className="space-division">
                <div className="x2">
                  <div className="assembler-info-div">
                    <span>Montador</span>
                    <p>Nome do Montador</p>

                    <button className="remove-assembler-btn" type="button">
                      <FiX size={25} />
                    </button>
                  </div>
                </div>
                <div className="x-divisor" />
                <div className="x1">
                  <div className="assembler-info-div">
                  <span>Comissão</span>
                  <p className="text-center">10%</p>
                  </div>
                </div>
              </div>
            </div>

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
                  <p className="tr-border-radius">Não</p>
                </div>
                <div className="assessment-row">
                  <span>Nota de Limpeza e Finalização</span>
                  <p>10</p>
                </div>
                <div className="assessment-row">
                  <span>Nota de Acabamento</span>
                  <p>10</p>
                </div>
                <div className="assessment-row">
                  <span>Nota do Cliente</span>
                  <p>10</p>
                </div>
                <div className="assessment-row">
                  <span className="bltr-border-radius">Nota da Gerência</span>
                  <p className="br-border-radius">10</p>
                </div>
              </div>
              <div id="comments">
                <span>Comentários</span>
                <p>Alguns comentários sobre a instalação feito pela gerência...</p>
              </div>
            </div>
          </AssessmentArea>

          <Button name="Salvar" />
        </form>
      </main>
      {
        showPopup && <ModalView isOpen={showPopup} title="Adicionar Montador" >
          <ModalContent>
            <div className="space-division">
              <div className="x2">
                <Select
                  label="Status do Pedido"
                  options={[
                    { value: 1, description: 'Fulano' },
                    { value: 2, description: 'Ciclano' },
                    { value: 3, description: 'Beltano' },
                  ]}
                />
              </div>
              <div className="x-divisor" />
              <div className="x1">
                <Input
                  label="Comissão"
                  placeholder="10%"
                />
              </div>
            </div>
            <Button name="Adicionar" />

            <div className="modal-space-divisor" />

            <Button
              name="Fechar"
              color="white"
              size="small"
              onClick={toggleShowPopup}
            />
          </ModalContent>
        </ModalView>
      }
    </Container>
  );
};

export default InstallationData;
