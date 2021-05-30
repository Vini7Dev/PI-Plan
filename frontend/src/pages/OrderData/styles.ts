import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h1 {
    margin-bottom: -12px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
  }

  #navigation-area {
    flex: 0.5;
  }

  #form-area {
    flex: 2;

    padding: 20px 8%;

    form {
      width: 100%;
      max-width: 720px;

      .space-division {
        display: flex;

        .x1 {
          flex: 0.25;
        }

        .x2 {
          flex: 0.75;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    #form-area {
      padding: 10px;
      flex: 2;

      form {
        width: 100%;
        max-width: 720px;

        .space-division {
          display: flex;

          .x1 {
            flex: 0.6;
          }

          .x2 {
            flex: 0.95;
          }
        }
      }
    }
  }
`;
