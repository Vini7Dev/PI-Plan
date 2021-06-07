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

  #form-area {
    flex: 2;

    padding: 20px 8%;

    form {
      width: 100%;
      max-width: 720px;

      .space-division{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0;

        .checkB{
          font-size: 50px;
          position: absolute;
	        left: -90px;
	        top: -70px;
          label{
            color: #36373D;
          }
        }
        .v1{
          width: 70%;
        }
        .v2{
          width: 25%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    #form-area {
      padding: 10px;
      flex: 2;

      form {
        width: 100%;
        max-width: 720px;

        .space-division {
          flex-direction: column;
        }
      }
    }
  }
`;
