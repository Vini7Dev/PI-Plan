import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #9E825E 2.88%, #B8976B 48.91%, #FFDFB4 100%);
  -webkit-font-smoothing: antialiased;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 30px;
    max-width: 536px;
    width: 70%;
    margin: 5% 20%;

    img {
      width: 150px;
      height: 170px;
    }

    #h {
      width: 70%;

      h2 {
        color: #2D3748;
        font-weight: normal;
      }

      h2, h1 {
        margin-right: auto;
        margin-left: 30px;
      }
    }
  }

  @media (max-width: 768px) {
    height: 100vh;

    div {
      width: 80%;
      margin: 5%;

      #h {
        h2, h1 {
          margin: 0 auto;
        }
      }
    }
  }
`;
