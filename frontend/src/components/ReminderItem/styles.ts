import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;

  background-color: #CEAA7B;
  border: 5px solid #B8976B;
  border-radius: 30px;
  padding: 10px;
  margin: 0 5px;
  color: #FFFFFF;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;

  svg {
    margin-left: auto;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  strong {
    font-size: 30px;
  }

  span {
    width: 100%;
    padding: 3px 0;
    margin: 10px 0;
    border-radius: 25px;

    font-size: 18px;
    background-color: #B8976B;
  }

  p {
    font-size: 16px;
    line-height: 25px;
  }
`;
