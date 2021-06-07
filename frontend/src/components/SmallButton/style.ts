import styled from 'styled-components';

interface IProps{
  backgroundcolor: 'green' | 'beige';
}

export const Container = styled.div<IProps>`
  position: relative;
  width: 200px;
  height: 65px;
  margin: 10px 0 30px 0;

  button {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 28px;
    line-height: 20px;
    border: none;
    border-radius: 30px;
    color: #ffffff;

    background-color: ${
      props => {
        if(props.backgroundcolor === "green"){
          return "#91D2A1"
        }
        return "#CEAA7B"
        }
      }
    }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
