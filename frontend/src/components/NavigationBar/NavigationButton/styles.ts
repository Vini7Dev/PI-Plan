import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;

  text-decoration: none;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;

  color: #ffffff;
  background-color: #b8976b;
  border: 4px solid #ceaa7b;
  border-radius: 20px;
  margin-bottom: 10px;

  transition: opacity 200ms;

  &:hover {
    opacity: 0.6;
  }

  &#nav-link-selected {
    background-color: #ceaa7b;
  }
`;
