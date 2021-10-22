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

    padding: 20px 8%;

    #title {
      margin-bottom: 20px;
    }

    #register-page-link {
      width: 100%;
      height: 45px;
      margin-bottom: 20px;

      a {
        display: block;
        height: 100%;
        width: 100%;

        border: none;
        border-radius: 30px;

        font-family: Arial, Helvetica, sans-serif;
        line-height: 43px;
        text-align: center;
        text-decoration: none;
        font-size: 28px;

        background-color: #91d2a1;
        color: #ffffff;
      }
    }

    #table-border {
      width: 100%;
      max-width: 1200px;
      border: 2px solid #CEAA7B;
      border-radius: 30px;
      padding: 20px;
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
  }

  @media (max-width: 768px) {
    flex-direction: column;

    #table-area {
      padding: 10px;

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

      th {
        padding: 25px;
        color: #FFFFFF;
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
  }

  tbody tr {
    border-radius: 30px;
    height: 45px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);

    text-decoration: none;
    width: 100%;
    position: relative;
    color: #60626C;

    td {
      position: relative;
      padding: 25px;
      color: #60626C;
      font-size: 16px;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;

      a {
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
        color: inherit;
      }


      .td-x1 {
        width: 20%;
      }

      .td-x2 {
        width: 40%;
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

      .ic {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin: 0 5px;
      }

      .ic-completed {
        border: 1px solid #00C65B;
        background-color: #0BEB14;
        color: #0BEB14;
      }

      .ic-inprogress {
        border: 1px solid #C2C600;
        background-color: #E6EB0B;
        color: #E6EB0B;
      }
    }
  }
`;
