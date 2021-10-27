import React, { useCallback, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import {
  Container,
  BannerImageArea,
} from './styles';

import { useAuth } from '../../contexts/Authentication';
import Logo from '../../assets/images/PI_Plan.png';

import ModalView from '../../components/ModalView';
import Input from '../../components/Input';
import AddImageInput from '../../components/AddImageInput';
import Button from '../../components/Button';
import PortfolioItem from '../../components/PortfolioItem';
import SearchBarButton from '../../components/SearchBarButton';

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNavigateToLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const handleNavigateToDashboard = useCallback(() => {
    user.user_type === 'admin'
      ? history.push('/dashboard')
      : history.push('/orders-list');
  }, [history, user]);

  return (
    <Container isAuthenticated>
      <nav>
        <div id="nav-logo-area">
          <img src={Logo} alt="Planejados Inteligentes" />

          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Busque por um produto"
            color="white"
            onClickInSearchButton={() => {
              //
            }}
          />
        </div>

        <div id="nav-button">
          {
            user ? (
              <>
                <Button
                  name="Adicionar item"
                  size="small"
                  color="white"
                  onClick={() => setModalIsOpen(true)}
                />

                <div className="nav-btn-divisor" />

                <Button
                  name="Página Inicial"
                  size="small"
                  color="white"
                  onClick={handleNavigateToDashboard}
                />
              </>
            ) : (
              <Button
                name="Entrar"
                size="small"
                color="white"
                onClick={handleNavigateToLogin}
              />
            )
          }
        </div>
      </nav>

      <section id="banner-area">
        <BannerImageArea>
          <div id="banner-left-arrow">
            <FiChevronLeft className="arrow-icon" />
          </div>

          <div id="banner-right-arrow">
            <FiChevronRight className="arrow-icon" />
          </div>
        </BannerImageArea>
      </section>

      <main id="items-list-area">
        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />

        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />

        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />

        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />
        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />

        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />

        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />

        <PortfolioItem
          id="1234567890"
          title="Cadeira da Área de Lazer"
          description="Descrição simples do projeto..."
        />
      </main>

      <ModalView
        isOpen={modalIsOpen}
        title="Adicionar Item"
      >
        <Form onSubmit={() => setModalIsOpen(false)}>
          <Input
            label="Título"
            name="title"
            placeholder="Informe o título do móvel"
          />

          <Input
            label="Descrição"
            name="description"
            placeholder="Descreva o móvel"
          />

          <AddImageInput />

          <Button
            name="Adicionar"
            type="submit"
          />

          <div className="modal-space-divisor" />

          <Button
            name="Fechar"
            onClick={() => setModalIsOpen(false)}
            color="white"
            size="small"
          />
        </Form>
      </ModalView>
    </Container>
  );
}

export default Portfolio;
