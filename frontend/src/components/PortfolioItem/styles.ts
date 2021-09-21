import styled from 'styled-components';

import Example1 from '../../assets/images/Examples/Example_1.png';

export const Container = styled.div`
  position: relative;
  width: 275px;
  min-height: 220px;

  margin: 10px 20px;
  border-radius: 15px;
  background: url(${Example1}) no-repeat center center;

  div.portfolio-item-content {
    position: absolute;
    bottom: 0;
    padding: 30px 10px 5px;
    width: 100%;
    border-radius: 0 0 15px 15px;

    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    strong, p {
      font-family: Arial, Helvetica, sans-serif;
      color: #ffffff;
    }

    strong {
      font-size: 20px;
    }

    p {
      font-size: 18px;
    }
  }
`;
