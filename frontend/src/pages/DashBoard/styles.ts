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
    padding: 20px 8% 50px;

    #scroll-items-area {
      div {
        button {
          background-color: #FFFFFF;
          color: #797D8A;
          font-size: 50px;
          box-shadow: none;
        }

        #empty-reminders-list {
          font-size: 30px;
          text-align: center;
          color: #797D8A;
          margin: 30px 0;
        }
      }
    }

    main {
      width: 100%;

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

export const TasksList = styled.div`
  #empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;

    p {
      font-size: 30px;
      text-align: center;
      color: #797D8A;
      margin: 30px 0;
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

    .item-data {
      display: flex;
      align-items: center;
      width: 100%;
      border: none;
      background: none;
      text-align: left;

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
          font-size: 22px;
          font-weight: bold;
          color: #36373D;
        }

        p {
          font-size: 16px;
        }
      }

      input {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }

    .ic-remove {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 10px;
      padding: 5px;
      border-radius: 100%;
      border: 2px solid #CB4242;
      background-color: #FF5555;
      color: #FFFFFF;
      font-size: 22px;
      transition: background-color 200ms;

      &:hover {
        background-color: #CB4242;
      }
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const AddTaskButton = styled.div`
  width: 100%;
  height: 40px;

  button {
    height: 100%;
    width: 100%;

    border: none;
    font-size: 30px;
    border-radius: 30px;

    background-color: #CEAA7B;
    color: #ffffff;
  }

  transition: opacity 200ms;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
