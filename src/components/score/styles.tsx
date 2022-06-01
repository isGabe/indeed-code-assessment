import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;

  .playAgain {
    display: inline-flex;
  }
`;

export const ScoreMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-width: 250px;
    margin-bottom: 2rem;
  }

  h2 {
    max-inline-size: unset;
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 2rem;
  }
`;
