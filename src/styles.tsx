import styled, { createGlobalStyle } from 'styled-components';
import 'open-props/normalize';
import 'open-props/style';

export const GlobalStyle = createGlobalStyle`

  :root {
    --grayLight: #fafafa;
    --grayMedium: #949494;
    --grayDark: #2d2d2d;
    --blue: #2557a7;
  }

  body {
    color: var(--grayDark);
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
  max-width: 600px;
  overflow: hidden;
`;

export const Inner = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  color: var(--blue-9);
  margin: 0;
  background-color: var(--gray-2);
  max-inline-size: none;
  padding: 1rem 2rem;
  text-align: center;
`;

export const SubHeading = styled.h2`
  border-bottom: solid 1px var(--grayMedium);
  padding: 0 0 0.75rem 0.5rem;
  width: 100%;
`;
export const OptionsLabel = styled.p`
  margin-bottom: 1rem;
  font-style: italic;
`;
export const GameOptions = styled.div`
  padding: 0 1rem;
`;

export const GameOption = styled.div`
  padding: 1rem 0;
`;

export const Difficulties = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0 2rem;
`;
export const Questions = styled.div``;

export const Score = styled.div``;
