import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;

  background-color: #b8976b;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 10px;

  border-radius: 0 30px 30px 0;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);

  img {
    border-radius: 0 30px 30px 0;
    max-width: 175px;
    width: 80%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    border-radius: 0 0 30px 30px;
    margin-bottom: 50px;
    min-height: 100%;

    img {
      max-width: 100px;
    }
  }
`;
