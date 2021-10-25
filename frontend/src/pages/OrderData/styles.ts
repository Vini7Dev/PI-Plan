import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h2, h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    font-size: 25px;
    color: #60626C;
  }

  #navigation-area {
    flex: 0.5;
  }

  #form-area {
    flex: 2;
    padding: 20px 8% 50px;

    form {
      width: 100%;

      .space-division{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: -20px 0;

        .x1 {
          flex: 0.35;
        }

        .x2 {
          flex: 0.65;
        }

        .x-divisor {
          width: 15px;
          margin-bottom: -20px;
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
          flex-direction: column;

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
