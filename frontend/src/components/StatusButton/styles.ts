import styled from 'styled-components';

export const Container = styled.div`
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
    border: 2px solid #FF5555;
    color: #FF5555;
    font-weight: 600;
    transition: background-color 500ms;

    &:hover {
      background-color: #FF5555;
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

