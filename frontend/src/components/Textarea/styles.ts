import styled from 'styled-components';

interface IContainerProps {
  inError: boolean;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  width: 100%;
  height: 100px;
  margin: 20px 0 30px;

  label {
    position: absolute;
    top: -15px;
    left: 12px;

    font-size: 20px;
    color: ${props => props.inError ? '#FF3300' : '#ceaa7b'};
    font-weight: bold;

    background-color: white;
    padding: 5px;
  }

  textarea {
    resize: none;
    height: 100%;
    width: 100%;
    padding: 15px 10px;

    border: ${props => props.inError
      ? '3px solid #FF3300'
      : '2px solid #ceaa7b'
    };

    border-radius: 15px;

    font-size: 18px;
  }

  span {
    display: block;
    margin-top: 2px;
    text-align: right;
    color: #FF3300;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
