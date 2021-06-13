import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;

  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;

  color: #FFFFFF;
  background-color: #B8976B;
  border: 4px solid #CEAA7B;
  border-radius: 20px;
  margin-bottom: 10px;

  &#nav-link-selected {
    background-color: #CEAA7B;
  }
`;
