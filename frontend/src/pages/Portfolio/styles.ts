import styled from 'styled-components';

import Banner from '../../assets/images/Portfolio_Banner.png';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  nav {
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b8976b;

    img {
      height: 100%;
    }
  }

  section#banner-area {
    width: 100%;
    padding: 10px 100px;
    background-color: #b8976b;
  }
`;

export const BannerImageArea = styled.div`
  width: 100%;
  height: 100%;
  min-height: 480px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border: 3px solid #ceaa7b;
  background: url(${Banner}) no-repeat;

  svg.arrow-icon {
    font-size: 80px;
    color: #ffffff;
  }

  div#banner-left-arrow {
    height: 100%;
    padding: 0 100px 0 25px;
    display: flex;
    align-items: center;

    border-radius: 30px;
    vertical-align: middle;

    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }

  div#banner-right-arrow {
    height: 100%;
    padding: 0 25px 0 100px;
    display: flex;
    align-items: center;

    border-radius: 30px;
    vertical-align: middle;

    background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
`;
