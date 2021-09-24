import  styled  from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h1{
    margin-bottom: -12px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    color: #60626C;
  }

  #navigation-area{
    flex: 0.5;
  }

  #form-area{
    flex: 2;

    padding: 20px 8%;

    form{
      width: 100%;
      max-width: 720px;

      h1 {
        margin-bottom: 20px;
      }

      #user-type-buttons-area {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;

        .user-type-button {
          width: 100%;
          max-width: 250px;
        }
      }
    }
  }

  @media (max-width: 768px){
    flex-direction: column;

    #form-area{
      padding: 10px;
      flex: 2;

      form{
        width: 100%;
        max-width: 720px;

        #user-type-buttons-area .user-type-button {
          max-width: 100%;
          margin: 5px 0;
        }
      }
    }
  }
`;
