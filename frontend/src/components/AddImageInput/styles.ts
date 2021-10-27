import styled from 'styled-components';

export const Container = styled.div`
  height: 200px;
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(206, 170, 123, 0.8);
  border-radius: 30px;
  border: 5px solid #ceaa7b;
  margin: 10px auto;
  transition: background-color 200ms;

  &:hover {
  background-color: rgba(206, 170, 123, 0.65);
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;
