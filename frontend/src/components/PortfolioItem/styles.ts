import styled from 'styled-components';

interface IContainerProps {
  imageUrl: string;
}

export const Container = styled.button<IContainerProps>`
  position: relative;
  width: 100%;
  max-width: 275px;
  min-height: 220px;

  margin: 20px 20px;
  border: none;
  border-radius: 15px;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .item-button {
    width: 275px;
    height: 220px;
    border: none;
    text-align: left;
    border-radius: 15px;
    background: none;
    transition: background-color 200ms;

    &:hover {
      background-color: rgba(0, 0, 0, 0.25);
    }

    div.portfolio-item-content {
      position: absolute;
      bottom: 0;
      padding: 30px 10px 5px;
      width: 100%;
      border-radius: 0 0 15px 15px;

      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

      strong, p {
        font-family: Arial, Helvetica, sans-serif;
        color: #ffffff;
      }

      strong {
        font-size: 20px;
      }

      p {
        font-size: 16px;
      }
    }
  }

  .remove-item-button {
    position: absolute;
    top: -5px;
    right: -5px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5px;
    border-radius: 100%;
    border: 2px solid #CB4242;
    background-color: #FF5555;
    color: #FFFFFF;
    font-size: 25px;
  }
`;
