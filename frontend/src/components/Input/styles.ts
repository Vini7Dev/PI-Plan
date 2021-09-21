import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 65px;

  margin: 20px 0;

  label {
    position: absolute;
    top: -15px;
    left: 12px;

    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    color: #ceaa7b;
    font-weight: bold;

    background-color: white;
    padding: 5px;
  }

  input {
    height: 100%;
    width: 100%;

    border: 2px solid #ceaa7b;
    border-radius: 15px;

    padding: 30px 10px;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
