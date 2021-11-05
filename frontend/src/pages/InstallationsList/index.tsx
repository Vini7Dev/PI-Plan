import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'

import { Container, Table } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Header from '../../components/Header';
import SearchBarButton from '../../components/SearchBarButton';

interface IInstallationProps {
  id: number;
  title: string;
  completion_forecast: string;
  end_date?: string;
}

// Página para listagem das intalações
const InstallationsList: React.FC = () => {
  const [installations, setInstallations] = useState<IInstallationProps[]>([]);

  return (
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={4} />
      </div>

      <main id="table-area">
        <Header title="Instalações">
          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Procure por uma instalação"
            onClickInSearchButton={() => {
              //
            }}
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
                  <tr key={1}>
                    <td className="text-center td-id td-x1">
                      <Link to={`/installation-data/${1}`}>
                        <span
                          className="ic ic-inprogress"
                        >IC</span>
                      </Link>
                    </td>
                    <td className="text-left td-x3">
                      <Link to={`/installation-data/${1}`}>
                        Armário de Cozinha
                      </Link>
                      </td>
                    <td className="text-center td-x2">
                    <Link to={`/installation-data/${1}`}>
                      10 / 01 / 2022
                      </Link>
                      <button className="ic-remove">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
};

export default InstallationsList;
