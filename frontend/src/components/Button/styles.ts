import styled, { css } from 'styled-components';

interface IButtonProps {
  size: 'normal' | 'small';
  color: 'green' | 'white';
}

export const Container = styled.div<IButtonProps>`
  position: relative;
  width: 100%;
  height: ${props => props.size === 'normal' ? '80px' : '50px'};

  button {
    width: 100%;
    height: 100%;

    border: none;
    font-size: ${props => props.size === 'normal' ? '30px' : '20px'};
    border-radius: 30px;

    background-color: ${props => {
      switch(props.color) {
        case 'green':
          return '#91d2a1';
        case 'white':
          return '#fffff';
        default:
          return '#91d2a1';
      }
    }};

    ${props => props.color === 'white' && css`
      border: 2px solid #ceaa7b;
    `}

    color: ${props => {
      switch(props.color) {
        case 'green':
          return '#ffffff';
        case 'white':
          return '#ceaa7b';
        default:
        return '#ffffff';
      }
    }};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
