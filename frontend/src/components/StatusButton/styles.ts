import styled from 'styled-components';

interface IContainerProps {
  statusColor: 'yellow' | 'green' | 'red';
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
    border: 2px solid ${props => {
    switch (props.statusColor) {
      case 'yellow':
        return '#C2C600';
      case 'green':
        return '#7DB88C';
      default:
        return '#C2C600';
    }
  }};
    color: ${props => {
    switch (props.statusColor) {
      case 'yellow':
        return '#C2C600';
      case 'green':
        return '#7DB88C';
      default:
        return '#C2C600';
    }
  }};
    font-weight: 600;
  }

  button {
    background: #FFFFFF;
    border: 2px solid #895EC1;
    color: #895EC1;
    font-weight: 600;
    transition: 500ms;

    &:hover {
      background-color: #895EC1;
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

