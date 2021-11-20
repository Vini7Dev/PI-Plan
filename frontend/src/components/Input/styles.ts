import styled, { css } from 'styled-components';

interface IInputProps {
  color: 'brown' | 'white';
  hsize: 'normal' | 'small';
  inError: boolean;
}

export const Container = styled.div<IInputProps>`
  position: relative;
  width: 100%;
  height: ${props => props.hsize === 'normal' ? '65px' : '56px'};
  margin: 20px 0 30px;

  label {
    position: absolute;
    top: -15px;
    left: 12px;

    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    color: ${props => props.inError ? '#FF3300' : props.color === 'brown' ? '#ceaa7b' : '#ffffff'};
    font-weight: bold;

    background-color: ${props => props.color === 'brown' ? '#ffffff' : '#b8976b'};
    padding: 5px;
  }

  input {
    height: ${props => props.hsize === 'normal' ? '100%' : '80%'};
    width: 100%;

    border: ${props => props.inError
      ? '3px solid #FF3300'
      : `2px solid ${props.color === 'brown' ? '#ceaa7b' : '#ffffff'}`
    };

    background-color: ${props => props.color === 'brown' ? '#ffffff' : '#b8976b'};
    border-radius: 15px;

    padding: ${props => props.hsize === 'normal' ? '30px' : '25px'} 10px;
    font-size: 18px;

    ${props => props.color === 'white' && css`color: #ffffff;` };
  }

  ${props => props.color === 'white' && css`
    input::placeholder {
      color: #d9d9d9;
    }
  `}

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
