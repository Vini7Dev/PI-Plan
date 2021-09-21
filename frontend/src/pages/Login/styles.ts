import styled from 'styled-components';

import LoginBanner from '../../assets/images/LoginBanner.jpg'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #9E825E 2.88%, #B8976B 48.91%, #FFDFB4 100%);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  height: 100%;

  div#right-background-image-area {
    height: 100%;
    width: 100%;
    max-height: 570px;
    max-width: 1100px;

    border-radius: 30px;
    margin: 20px 80px;

    background: url(${LoginBanner}) no-repeat;
    background-size: auto 100%;

    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background-color: white;
      border-radius: 30px;
      max-width: 536px;
      width: 50%;
      padding: 30px;

      img {
        width: 125px;
        height: 150px;
      }

      #title {
        width: 100%;

        h2 {
          color: #2D3748;
          font-weight: normal;
        }

        h2, h1 {
          font-family: Arial, Helvetica, sans-serif;
          margin-right: auto;
          margin-left: 32px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    div#right-background-image-area {
      main {
        width: 100%;

        #title {
          h2, h1 {
            margin: 0 auto;
            text-align: center;
          }
        }
      }
    }
  }
`;
