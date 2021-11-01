import styled from 'styled-components';

interface IContainerProps {
  color: 'brown' | 'black';
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;

  label{
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: ${props => props.color === 'brown' ? '#B8976B' : '#36373D'};
    margin-right: 20px;
  }

  input {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
