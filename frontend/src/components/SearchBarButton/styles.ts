import styled from 'styled-components';

interface IContainerProps {
  color: 'brown' | 'white';
}

export const Container = styled.div<IContainerProps>`
  form {
    display: flex;
    align-items: center;
    width: 100%;

    button {
      width: 80px;
      height: 65px;
      margin-left: 20px;
      border: none;
      border-radius: 50%;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
      transition: opacity 200ms;

      background-color: ${props => {
        switch(props.color) {
          case 'white':
            return '#fffff';
          default:
            return '#91D2A1';
        }
      }};

      color: ${props => {
        switch(props.color) {
          case 'white':
            return '#ceaa7b';
          default:
            return '#ffffff';
        }
      }};

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
