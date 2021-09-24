import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import ModalView from '../../components/ModalView';

import {
  Container,
  BannerImageArea,
  ModalContentArea,
} from './styles';

import Logo from '../../assets/images/PI_Plan.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import PortfolioItem from '../../components/PortfolioItem';

const Portfolio: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Container>
      <nav>
        <div id="w-125-px" />

        <div id="nav-logo-area">
          <img src={Logo} alt="Planejados Inteligentes" />

          <Input
            label="Pesquisar"
            placeholder="Pesquise por um móvel..."
            color="white"
            hsize="small"
          />
        </div>

        <div id="nav-login-button">
          <Button
            name="Adicionar item"
            size="small"
            color="white"
            onClick={() => setModalIsOpen(true)}
          />

          <div className="nav-btn-divisor" />

          <Button
            name="Sair"
            size="small"
            color="white"
          />
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

      <ModalView isOpen={modalIsOpen}>
        <form>
          <Input
            label="Título"
            placeholder="Informe o título do móvel"
          />

          <Input
            label="Descrição"
            placeholder="Descreva o móvel"
          />

          <Button
            name="Adicionar"
            onClick={() => setModalIsOpen(false)}
          />

          <div className="space-divisor" />

          <Button
            name="Fechar"
            onClick={() => setModalIsOpen(false)}
            color="white"
            size="small"
          />
        </form>
      </ModalView>
    </Container>
  );
}

export default Portfolio;
