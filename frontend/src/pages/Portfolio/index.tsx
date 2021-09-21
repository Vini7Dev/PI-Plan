import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Container, BannerImageArea } from './styles';

import Logo from '../../assets/images/PI_Plan.png';

const Portfolio: React.FC = () => {
  return (
    <Container>
      <nav>
        <img src={Logo} alt="Logo" />
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
    </Container>
  );
}

export default Portfolio;
