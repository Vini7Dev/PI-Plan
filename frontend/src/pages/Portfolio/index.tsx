import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Container, BannerImageArea } from './styles';

import Logo from '../../assets/images/PI_Plan.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import PortfolioItem from '../../components/PortfolioItem';

const Portfolio: React.FC = () => {
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
            name="Entrar"
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
    </Container>
  );
}

export default Portfolio;
