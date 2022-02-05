import styled, { css } from 'styled-components';

interface IContainerProps {
  size: 'normal' | 'small';
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  height: 100%;

  div.modal-space-divisor {
    height: 20px;
  }

  h3 {
    font-size: 40px;
    font-style: italic;
    color: #60626C;
  }

  div#modal-content-area {
    ${props => (
    props.size === 'normal'
      ? css`
          margin: 20px 0;
          padding: 0 0 20px 0;
        `
      : css`
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `
  )}
  }

  @media (max-width: 768px) {
    & h3 {
      font-size: 30px;
    }
  }
`;
