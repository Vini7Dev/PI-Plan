import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  #navigation-area {
    flex: 0.5;
  }

  #table-area {
    flex: 2;
    padding: 20px 8% 50px;

    #title {
      margin-bottom: 20px;
    }

    #notes-calculator {
      margin-bottom: 20px;
    }

    #table-border {
      width: 100%;
      max-width: 1200px;
      border: 2px solid #CEAA7B;
      border-radius: 30px;
      padding: 20px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    #table-area {
      padding: 10px;
      flex: 2;

      form {
        width: 100%;
        max-width: 720px;
      }

      #table-border {
        border: none;
        padding: 0;
      }
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  thead {
    tr {
      background-color: #CEAA7B;

      th, button {
        color: #FFFFFF;
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        border: none;
        background: none;
      }

      th {
        height: 50px;
        padding: 25px;
      }

      button {
        height: 100%;
      }
    }
  }

  tbody tr {
    border-radius: 30px;
    height: 45px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);

    td {
      position: relative;
      padding: 25px;
      color: #60626C;
      font-size: 16px;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;

      a {
        text-decoration: none;
        color: inherit;
      }

      div {
        padding: 0;
        margin: 0;
      }
    }

    .checkbox {
      margin: 0 auto;
    }

    .ic-remove {
      position: absolute;
      top: 0;
      right: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 3px;
      border-radius: 100%;
      border: 2px solid #CB4242;
      background-color: #FF5555;
      color: #FFFFFF;
      font-size: 18px;
    }

    td .ic {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin: 0 5px;
    }

    td .ic-inprogress {
      border: 1px solid #C2C600;
      background-color: #E6EB0B;
      color: #E6EB0B;
    }

    td .ic-completed {
      border: 1px solid #00C65B;
      background-color: #0BEB14;
      color: #0BEB14;
    }

    td .ic-canceled {
      border: 1px solid #CB4242;
      background-color: #FF5555;
      color: #FF5555;
    }
  }

  .td-x1 {
    width: 5%;
  }

  .td-x2 {
    width: 25%;
  }

  .td-x3 {
    width: 70%;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  .start-border-r {
      border-radius: 30px 0 0 30px;
    }

  .end-border-r {
    border-radius: 0 30px 30px 0;
  }

  #empty-assessments-list {
    font-size: 25px;
    text-align: center;
  }
`;
