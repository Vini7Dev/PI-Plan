import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  margin: 75px 0 40px 0;

  button {
    height: 100%;
    width: 100%;

    border: none;
    font-size: 30px;
    border-radius: 30px;

    background-color: #91d2a1;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
