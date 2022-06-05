import styled, { createGlobalStyle } from 'styled-components';
import { Paper } from '@material-ui/core';
import 'open-props/normalize';
import 'open-props/style';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }

  h1, h2, h3, h4{
    max-inline-size: none;
  }

`;

export const Wrapper = styled(Paper)`
  background-color: var(--gray-1);
  box-shadow: var(--shadow-6);
  margin: 3rem auto 0;
  overflow: hidden;
  width: min(95%, 800px);
`;

export const Inner = styled.div`
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  margin: 0;
  background-color: var(--gray-2);
  padding: 1rem 2rem;
  text-align: center;
`;
