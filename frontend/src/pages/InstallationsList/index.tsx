import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import parseDateStringToBrFormat from '../../utils/parseDateStringToBrFormat';
import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import SearchBarButton from '../../components/SearchBarButton';

interface IInstallationProps {
  id: string;
  order_id: string;
  completion_forecast: string;
  end_date?: string;
  order: {
    title: string;
  }
}

// Página para listagem das intalações
const InstallationsList: React.FC = () => {
  const [installations, setInstallations] = useState<IInstallationProps[]>([]);
  const [searchString, setSearchString] = useState('');

  // Função para carregar as instalações cadastradas
  const handleLoadInstallations = useCallback(async () => {
    const { data: installationsList } = await api.get<IInstallationProps[]>(`/installations${
      searchString ? `?search_string=${searchString}` : ''
    }`);

    setInstallations(installationsList);
  }, [searchString]);

  // Função para apagar uma instalação
  const handleDeleteInstallation = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar a instalação
    const response = confirm('Você realmente deseja apagar a instalação?');

    if(!response) {
      return;
    }

    // Enviando a requisição para apagar o pedido
    await api.delete(`/installations/${id}`);

    // Recarregando a lista de pedidos
    handleLoadInstallations();
  }, [handleLoadInstallations]);

  return (
    <Container onLoad={handleLoadInstallations}>
      <div id="navigation-area">
        <NavigationBar optionSelected={4} />
      </div>

      <main id="table-area">
        <Header title="Instalações">
        <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Procure por uma instalação"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onClickInSearchButton={handleLoadInstallations}
          />
        </Header>

        <div id="table-border">
          <Table>
            <thead>
              <tr>
                <th className="start-border-r td-x1">Status</th>
                <th className="text-left td-x3">Título</th>
                <th className="end-border-r td-x2">Data de Finalização</th>
              </tr>
            </thead>
            <tbody>
              {
                installations.length > 0
                  ? installations.map(installation => (
                    <tr key={installation.id}>
                      <td className="text-center td-id td-x1">
                        <Link to={`/installation-data/${installation.id}?order_id=${installation.order_id}`}>
                          <span
                            className={`ic ${
                              installation.end_date ? 'ic-completed' : 'ic-inprogress'
                            }`}
                          >IC</span>
                        </Link>
                      </td>
                      <td className="text-left td-x3">
                        <Link to={`/installation-data/${installation.id}?order_id=${installation.order_id}`}>
                          {installation.order.title}
                        </Link>
                        </td>
                      <td className="text-center td-x2">
                      <Link to={`/installation-data/${installation.id}?order_id=${installation.order_id}`}>
                      { parseDateStringToBrFormat(installation.end_date || installation.completion_forecast) }
                        </Link>
                        <button
                          className="ic-remove"
                          onClick={() => handleDeleteInstallation(installation.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                  : <tr><td colSpan={3}><p id="empty-installations-list">Sem instalações...</p></td></tr>
              }
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
};

export default InstallationsList;
