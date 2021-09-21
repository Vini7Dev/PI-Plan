import styled from 'styled-components';

import Banner from '../../assets/images/Portfolio_Banner.png';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  nav {
    position: relative;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b8976b;

    img {
      height: 100%;
    }

    div#nav-login-button {
      position: absolute;
      top: 18px;
      right: 60px;
      width: 125px;
    }
  }

  section#banner-area {
    width: 100%;
    padding: 10px 100px;
    background-color: #b8976b;
  }

  @media (max-width: 768px) {
    nav {
      flex-direction: column;

      div#nav-login-button {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 100%;
      }
    }

    section#banner-area {
      width: 100%;
      padding: 2px;
      background-color: #b8976b;
    }
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
  background: url(${Banner}) no-repeat center center;

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

    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }

  div#banner-right-arrow {
    height: 100%;
    padding: 0 25px 0 100px;
    display: flex;
    align-items: center;

    border-radius: 30px;

    background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }

  @media (max-width: 768px) {
    svg.arrow-icon {
      font-size: 50px;
      color: #ffffff;
    }

    div#banner-left-arrow {
      height: 100%;
      padding: 0;
      display: flex;
      align-items: center;

      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    }

    div#banner-right-arrow {
      height: 100%;
      padding: 0;
      display: flex;
      align-items: center;

      background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    }
  }
`;
