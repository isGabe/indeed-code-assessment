import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  .play {
    margin-right: auto;
  }
`;
export const SubHeading = styled.h2`
  border-bottom: solid 1px var(--gray-5);
  padding: 0 0 0.75rem 0.5rem;
  width: 100%;
  max-inline-size: unset;
`;
export const OptionsLabel = styled.p`
  margin-bottom: 1rem;
  font-style: italic;
`;

export const GameOption = styled.div`
  padding: 1rem 0;
`;

export const Difficulties = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0 2rem;
`;
