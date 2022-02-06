import styled from 'styled-components';

import Banner from '../../assets/images/Portfolio_Banner.png';

interface IBannerImageProps {
  file: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  nav {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    background-color: #b8976b;
    padding: 40px 100px 20px;
    z-index: 1;

    div#nav-logo-area {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      max-width: 500px;

      img {
        height: 100px;
        margin-right: 10px;
      }
    }

    div#nav-button {
      position: absolute;
      right: 25px;
      top: 34px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 300px;

      div.nav-btn-divisor {
        width: 20px;
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
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    nav {
      height: 100%;
      flex-direction: column;
      padding: 0 5px;

      div#nav-logo-area {
        flex-wrap: wrap;
        max-width: 80%;
        width: 100%;
      }

      div#nav-button {
        position: relative;
        right: 0;
        flex-wrap: wrap;
        max-width: 80%;
        width: 100%;
        margin: -25px 0 50px;
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
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.rec-pagination {
    position: absolute;
    bottom: -40px;

    button.rec-dot  {
      border: 2px solid #B8976B;
      box-shadow: 0 0 1px #B8976B;

      width: 16px;
      height: 16px;

      &:hover {
        border: 2px solid #8F6B3C;
        box-shadow: 0 0 1px #8F6B3C;
      }

      &.rec-dot_active {
        background-color: #8F6B3C;
        border: 2px solid #8F6B3C;
      }
    }
  }

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

export const BannerImage = styled.div<IBannerImageProps>`
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border: 3px solid #ceaa7b;
  background: url(${props => props.file}) no-repeat center;
  background-size: cover;
`;