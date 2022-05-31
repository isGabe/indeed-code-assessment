import styled from 'styled-components';
export const Wrapper = styled.div``;
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
  font-size: var(--font-size-2);
  margin-bottom: 2rem;
`;

export const Answers = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto;
  margin-bottom: 4rem;
`;

export const Message = styled.span`
  display: block;
  font-size: var(--font-size-3);
  font-style: italic;
  line-height: 1;
  margin-bottom: 1rem;
  min-height: var(--font-size-3);
  text-align: center;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
