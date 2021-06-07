import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h1 {
    margin-bottom: -50px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    color: #60626C;
  }

  #navigation-area {
    flex: 0.5;
  }

  #task-area {
    flex: 2;

    padding: 20px 8%;

    #banner-area {
      margin: 0 -150px 20px -150px;
      width: 10000px;
      max-width: 80vw;

      img {
        width: 100%;
        border-radius: 50px;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
      }
    }

    div {
      width: 100%;
      max-width: 720px;

      .space-division{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 75px;

        .v1{
          width: 70%;
        }
        .v2{
          width: 25%;
        }
      }

      .checkB{
          width: 100%;

          label{
            color: #36373D;
          }
        }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    #task-area {
      padding: 10px;
      flex: 2;

      #banner-area {
        display: none;
      }

      div {
        max-width: 720px;

        .space-division {
          justify-content: center;
          margin-left: -10%;
          width: 105%;

          .v1{
            width: 100%;

            button {
              background-color: #B8976B;
            }
          }
          .v2{
            margin-top: 10px;
              margin-left: 10%;
            width: 50%;
          }
        }
      }
    }
  }
`;
