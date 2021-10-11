import styled from 'styled-components';

export const Container = styled.header`
  position: relative;
  width: 100%;

  strong {
    display: flex;
    align-items: center;

    position: absolute;
    top: 0;
    right: 0;
    background-color: #CEAA7B;
    padding: 15px 30px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    font-weight: 600;
    color: #FFFFFF;
    border-radius: 30px;

    svg {
      margin-right: 5px;
    }
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    color: #60626C;
    padding: 60px 0 20px;
  }

  @media (max-width: 768px) {
    strong {
      position: relative;
      display: block;
      padding: 10px 30px;
      font-size: 18px;
      text-align: center;

      svg {
        display: none;
      }
    }

    h1 {
      padding: 20px 0;
    }
  }
`;
