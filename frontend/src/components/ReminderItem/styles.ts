import styled from 'styled-components';

interface IContainerProps {
  reminder_type: 'contact_alert' | 'order' | 'installation';
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 300px;

  background-color: ${props => {
    switch(props.reminder_type) {
      case 'order':
        return '#CEAA7B';
      case 'installation':
        return '#91D2A1';
      case 'contact_alert':
        return '#9B69DE';
      default:
        return '#CEAA7B';
    }
  }};

  border: 5px solid ${props => {
    switch(props.reminder_type) {
      case 'order':
        return '#B8976B';
      case 'installation':
        return '#7DB88C';
      case 'contact_alert':
        return '#895EC1';
      default:
        return '#B8976B';
    }
  }};

  border-radius: 30px;
  padding: 10px;
  margin: 0 5px;
  color: #FFFFFF;
  text-align: center;

  svg {
    margin-left: auto;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  strong {
    font-size: 25px;
    min-height: 60px;
  }

  span {
    width: 100%;
    padding: 3px;
    margin: 10px 0;
    border-radius: 25px;

    font-size: 18px;
    background-color: ${props => {
    switch(props.reminder_type) {
      case 'order':
        return '#B8976B';
      case 'installation':
        return '#7DB88C';
      case 'contact_alert':
        return '#895EC1';
      default:
        return '#B8976B';
    }
  }};
  }

  p {
    font-size: 16px;
    line-height: 25px;
  }
`;
