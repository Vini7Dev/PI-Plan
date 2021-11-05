import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    font-size: 25px;
    color: #60626C;
  }

  #navigation-area {
    flex: 0.5;
  }

  #content-area {
    flex: 2;
    padding: 20px 8% 50px;

    #form-area {
      form {
        width: 100%;

        .space-division{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .x1 {
            flex: 0.2;
          }

          .x2 {
            flex: 0.8;
          }

          .x-divisor {
            width: 15px;
            margin-bottom: -20px;
          }
        }
      }
    }
  }

  .text-center {
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    #form-area {
      padding: 10px;
      flex: 2;

      form {
        width: 100%;
        max-width: 720px;
      }
    }
  }
`;

export const AddAssemblersArea = styled.section`
  position: relative;
  margin-bottom: 25px;

  .assembler-info-div {
    position: relative;
    width: 100%;
    min-width: 136px;
    height: 65px;
    margin: 20px 0;

    span {
      position: absolute;
      top: -15px;
      left: 12px;

      font-size: 20px;
      color: #91D2A1;
      font-weight: bold;

      background-color: #FFFFFF;
      padding: 5px;
    }

    p {
      height: 100%;
      width: 100%;

      border: 2px solid #91D2A1;
      background-color: #FFFFFF;
      border-radius: 15px;

      padding: 20px 10px;
      font-size: 18px;
    }
  }

  .remove-assembler-btn {
    position: absolute;
    top: -15px;
    right: -10px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5px;
    color: #FFFFFF;
    background-color: #FF5555;
    border-radius: 50%;
    border: 0px;
    transition: 200ms;

    &:hover {
      border: 2px solid #FF5555;
    }
  }
`;

export const AssessmentArea = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 25px;

  border: 2px solid #CEAA7B;
  border-radius: 30px;
  padding: 20px;

  .tltr-border-radius {
    border-radius: 28px 30px 0 0 !important;
  }

  .tr-border-radius {
    border-radius: 0 30px 0 0 !important;
  }

  .br-border-radius {
    border-radius: 0 0 30px 0 !important;
  }

  .bltr-border-radius {
    border-radius: 0 0 30px 28px !important;
  }

  h3 {
    margin: 0 0 20px 0;
    font-size: 35px;
    font-style: italic;
    text-align: center;
    color: #60626C;
  }

  #assessment-content {
    background-color: #CEAA7B;
    border-radius: 30px;

    #assessment-table {
      border: 2px solid #CEAA7B;
      border-radius: 30px !important;
      background-color: #FFFFFF;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);

      .assessment-row {
        display: flex;
        justify-content: space-between;

        span, p {
          width: 100%;
          background-color: #CEAA7B;
          text-align: center;
          font-size: 25px;
          padding: 20px 0;
        }

        span {
          color: #FFFFFF;
          font-weight: 700;
        }

        p {
          background-color: #FFFFFF;
          color: #60626C;
          font-weight: 600;
        }
      }
    }

    #lost-amount-and-comments {
      padding: 15px;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;

      div {
        width: 45%;

        span {
          display: block;
          margin: 15px 0 12px 0;
          width: 100%;

          font-size: 35px;
          font-style: italic;
          font-weight: 600;
          text-align: center;
          color: #FFFFFF;
        }

        p {
          padding: 15px;
          font-size: 18px;
          color: #60626C;
          background-color: #FFFFFF;
          border: 2px solid #CEAA7B;
          border-radius: 30px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    #assessment-content {
      #lost-amount-and-comments {
        flex-wrap: wrap;

        div {
          width: 100%;
        }
      }
    }
  }
`;

export const ModalContent = styled.section`
  .space-division{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .x1 {
      flex: 0.2;
    }

    .x2 {
      flex: 0.8;
    }

    .x-divisor {
      width: 15px;
      margin-bottom: -20px;
    }
  }
`;
