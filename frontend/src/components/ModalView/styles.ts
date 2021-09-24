import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  div.modal-space-divisor {
    height: 20px;
  }

  h3 {
    font-size: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    color: #60626C;
  }

  div#modal-content-area {
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    & h3 {
      font-size: 30px;
    }
  }
`;
