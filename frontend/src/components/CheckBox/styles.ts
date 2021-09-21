import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;

  label{
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #36373D;
    margin-right: 20px;
  }

  input {
    width: 20px;
    height: 20px;
  }

  div p {
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
