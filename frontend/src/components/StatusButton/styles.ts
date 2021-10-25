import styled from 'styled-components';

interface IContainerProps {
  buttonColor: 'red' | 'green';
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  span, button {
    width: 100%;
    height: 60px;
    border-radius: 30px;
    font-size: 25px;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #C2C600;
    color: #C2C600;
    font-weight: 600;
  }

  button {
    background: #FFFFFF;
    border: 2px solid ${(props) => {
      switch(props.buttonColor) {
        case 'red': return '#FF5555';
        case 'green': return '#91D2A1';
        default: return '#FF5555';
      }
    }};
    color: ${(props) => {
      switch(props.buttonColor) {
        case 'red': return '#FF5555';
        case 'green': return '#91D2A1';
        default: return '#FF5555';
      }
    }};
    font-weight: 600;
    transition: 500ms;

    &:hover {
      background-color: ${(props) => {
      switch(props.buttonColor) {
        case 'red': return '#FF5555';
        case 'green': return '#91D2A1';
        default: return '#FF5555';
      }
    }};
      color: #FFFFFF;
      border: 2px solid #FFFFFF;
    }
  }

  div {
    width: 30px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    span {
      margin-bottom: 10px;
    }
  }
`;

