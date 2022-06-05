import styled from 'styled-components';

export const Info = styled.div`
  border-bottom: solid 1px var(--gray-5);
  color: var(--gray-7);
  display: flex;
  font-size: var(--font-size-1);
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem 0.5rem;
`;

export const Detail = styled.span`
  .label {
    color: var(--gray-7);
  }
`;

export const QuestionEl = styled.p`
  font-size: var(--font-size-3);
  margin-bottom: 2rem;
`;

export const Answers = styled.div`
  margin: 1rem 0 3rem;

  @media (min-width: 640px) {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto auto;
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
`;
