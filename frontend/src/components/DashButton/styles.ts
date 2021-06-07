import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 40px;

  button {
    height: 100%;
    width: 100%;

    border: none;
    font-size: 30px;
    border-radius: 30px;

    background-color: #CEAA7B;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
