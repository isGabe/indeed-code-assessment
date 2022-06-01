import styled, { createGlobalStyle } from 'styled-components';
import 'open-props/normalize';
import 'open-props/style';

export const GlobalStyle = createGlobalStyle`


  body {
    font-family: 'Noto Sans', sans-serif;
  }

  h1 {
    font-size: var(--font-size-5);
  }

  h2 {
    font-size: var(--font-size-4);
  }

  .visuallyHidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export const Wrapper = styled.div`
  background-color: var(--gray-1);
  border: solid var(--border-size-1) var(--gray-5);
  border-radius: var(--radius-3);
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
  p
`;

export const Title = styled.h1`
  color: var(--blue-9);
  margin: 0;
  background-color: var(--gray-2);
  max-inline-size: none;
  padding: 1rem 2rem;
  text-align: center;
`;
