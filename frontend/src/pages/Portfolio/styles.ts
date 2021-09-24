import styled from 'styled-components';

import Banner from '../../assets/images/Portfolio_Banner.png';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  nav {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #b8976b;
    padding: 40px 100px 20px;
    z-index: 1;

    div#nav-empty-div-align {
      width: 300px;
    }

    div#nav-logo-area {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      img {
        height: 100px;
        margin-right: 10px;
      }
    }

    div#nav-login-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 300px;

      button {
        min-width: 125px;
      }

      div.nav-btn-divisor {
        width: 50px;
        height: 5px;
      }
    }
  }

  section#banner-area {
    width: 100%;
    padding: 10px;
    border-radius: 0 0 25px 25px;
    background-color: #b8976b;
    box-shadow: 1px 1px 3px #000000;
  }

  main#items-list-area {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
  }

  @media (max-width: 768px) {
    nav {
      height: 100%;
      flex-direction: column;
      padding: 0 5px;

      div#w-125-px {
        display: none;
      }

      div#nav-logo-area {
        flex-wrap: wrap;
      }

      div#nav-login-button {
        margin-bottom: 15px;
        flex-wrap: wrap;
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

export const ModalContentArea = styled.div`
  width: 100%;
  height: 100%;

  div.space-divisor {
    height: 20px;
  }

  h3 {
    font-size: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    color: #60626C;
  }

  div {
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    & h3 {
      font-size: 30px;
    }
  }
`;
