import styled, { css } from 'styled-components';

interface IContainerProps {
  previewURL?: string;
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  max-width: 275px;
  min-height: 220px;
  display: flex;

  align-items: center;
  justify-content: center;

  ${
    props => props.previewURL && css`background-image: url(${props.previewURL});`
  }

  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: rgba(206, 170, 123, 0.8);
  border-radius: 30px;
  border: 5px solid #ceaa7b;

  margin: 10px auto;
  transition: background-color 200ms;

  &:hover {
    background-color: rgba(206, 170, 123, 0.65);
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    input {
      display: none;
    }
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;
