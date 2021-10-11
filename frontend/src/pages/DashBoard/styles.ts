import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 100vh;
  height: 100%;

  .margin-top-10 {
    margin-top: 10px;
  }

  #navigation-area {
    flex: 0.5;
  }

  #page-area {
    flex: 2;
    padding: 20px 8%;

    #scroll-items-area {
      h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-style: italic;
        color: #60626C;
        margin-bottom: 20px;
      }

      div button {
        background-color: #FFFFFF;
        color: #797D8A;
        font-size: 50px;
        box-shadow: none;
      }
    }

    main {
      width: 100%;
      max-width: 720px;

      .space-division{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 40px;

        .size1{
          width: 25%;
        }

        .size2{
          width: 70%;
        }
      }

      #tasks-list{
        width: 100%;

        label{
          color: #36373D;
        }

        #empty-list {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px;

          h4 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 35px;
            font-weight: 400;
          }
        }

        .task-item {
          display: flex;
          align-items: center;
          justify-content: left;
          background-color: rgba(0, 0, 0, 0.05);
          padding: 10px;
          margin: 5px 0;
          border-radius: 10px;

          div {
            margin: 0 !important;
          }

          .ic-remove {
              display: flex;
              justify-content: center;
              align-items: center;

              margin-left: 10px;
              padding: 3px;
              border-radius: 100%;
              border: 2px solid #CB4242;
              background-color: #FF5555;
              color: #FFFFFF;
              font-size: 18px;
            }
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
      margin: 15px auto;
      width: 90%;
      max-width: 600px;
      padding: 25px;
      border-radius: 20px;
      background-color: white;

      h3 {
        font-size: 25px;
        font-family: Arial, Helvetica, sans-serif;
        font-style: italic;
        color: #60626C;
      }

      button {
        margin-bottom: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    #page-area {
      flex: 2;
      padding: 10px;

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
