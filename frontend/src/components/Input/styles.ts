import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;

  margin: 45px 0 0 0;

  label {
    position: absolute;
    top: -16px;
    left: 25px;

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
    border-radius: 30px;

    padding: 30px 10px;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
