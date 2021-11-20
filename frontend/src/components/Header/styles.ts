import styled from 'styled-components';

export const Container = styled.header`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  button#header-user-button {
    border: none;

    position: absolute;
    top: 0;
    right: 0;
    background-color: #CEAA7B;
    padding: 15px 30px;
    border-radius: 30px;

    strong {
      display: flex;
      align-items: center;

      font-size: 25px;
      font-weight: 600;
      color: #FFFFFF;
      border-radius: 30px;

      svg {
        margin-right: 5px;
      }
    }
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    color: #60626C;
    padding: 60px 0 0;
  }

  @media (max-width: 768px) {
    button#header-user-button {
      position: relative;
      display: block;
      padding: 10px 30px;
      width: 100%;

      strong {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 35px;
      }
    }

    h1 {
      padding: 20px 0;
    }
  }
`;
