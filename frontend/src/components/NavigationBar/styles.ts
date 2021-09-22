import styled from 'styled-components';

interface IContainerProps {
  showNav: boolean;
}

export const Container = styled.nav<IContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  background-color: #b8976b;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 10px;

  border-radius: 0 30px 30px 0;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);

  img {
    border-radius: 0 30px 30px 0;
    max-width: 175px;
    width: 80%;
    margin: 0 auto;
  }

  #show-nav-button {
    display: none;
  }

  @media (max-width: 768px) {
    border-radius: 0 0 30px 30px;
    margin-bottom: 50px;
    min-height: 100%;

    img {
      max-width: 100px;
    }

    #show-nav-button {
      position: absolute;
      top: 35px;
      right: 35px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 50px;
      height: 50px;
      border-radius: 50px;

      border: none;
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
      background-color: #ceaa7b;
      color: #ffffff;

      font-size: 25px;
    }

    #nav-links-list {
      display: ${
        props => props.showNav ? 'block' : 'none'
      };
    }
  }
`;
