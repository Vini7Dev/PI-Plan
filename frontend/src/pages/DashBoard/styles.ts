import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
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

    main {
      width: 100%;
      max-width: 720px;

      .space-division{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 75px;

        .size1{
          width: 25%;
        }

        .size2{
          width: 70%;
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

  #task-popup {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    margin: 0 auto;

    background-color: rgba(0, 0, 0, 0.5);

    form {
      h3 {
        font-size: 25px;
        font-family: Arial, Helvetica, sans-serif;
        font-style: italic;
        color: #60626C;
      }

      margin: 25px auto;
      width: 90%;
      max-width: 600px;
      padding: 25px;
      border-radius: 20px;

      background-color: white;
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

      main {
        max-width: 720px;

        .space-division {
          justify-content: center;
          margin-left: -10%;
          width: 105%;

          .size1 {
            margin-top: 10px;
            margin-left: 10%;
            width: 50%;
          }

          .size2 {
            width: 100%;

            button {
              background-color: #B8976B;
            }
          }
        }
      }
    }
  }
`;
