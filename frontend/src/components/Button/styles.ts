import styled, { css } from 'styled-components';

interface IButtonProps {
  size: 'normal' | 'small';
  color: 'green' | 'white' | 'brown';
  active: boolean;
}

export const Container = styled.div<IButtonProps>`
  position: relative;
  width: 100%;
  height: ${props => props.size === 'normal' ? '80px' : '40px'};
  opacity: ${props => props.active ? 1 : 0.5};

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
        case 'brown':
          return '#ceaa7b'
        default:
          return '#91d2a1';
      }
    }};

    ${props => props.color === 'white' && css`box-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);`}

    color: ${props => {
      switch(props.color) {
        case 'green':
          return '#ffffff';
        case 'white':
          return '#ceaa7b';
        case 'brown':
          return '#ffffff'
        default:
        return '#ffffff';
      }
    }};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
