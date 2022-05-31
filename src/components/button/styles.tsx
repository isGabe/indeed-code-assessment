import styled from 'styled-components';

export const ButtonEl = styled.button`
  align-items: center;
  background-color: ${(props: any) =>
    props.variant === 'outlined' ? 'transparent' : 'var(--blue-9)'};
  border-radius: var(--radius-2);
  border: 0.0625rem solid transparent;
  border-color: ${(props: any) =>
    props.variant === 'outlined' ? 'var(--blue-9)' : 'transparent'};
  box-shadow: none;
  box-sizing: border-box;
  color: ${(props: any) =>
    props.variant === 'outlined' ? 'var(--blue-9)' : 'var(--gray-1)'};
  display: flex;
  justify-content: center;
  margin: 0;
  min-width: 94px;
  padding: 0.75rem 1rem 0.75rem 2rem;
  position: relative;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  text-align: center;
  text-decoration: none;
  word-break: keep-all;
  ${(props: any) => {
    if (props.variant === 'outlined') {
      if (props.answerStatus === 'correct') {
        return `
          color: var(--gray-0);
          background-color: var(--green-9);
          border-color: var(--green-9);
          `;
      }

      if (props.answerStatus === 'incorrect') {
        return `
          color: var(--gray-0);
          background-color: var(--red-9);
          border-color: var(--red-9);
          `;
      }
    }
  }};

  &:disabled {
    cursor: default;

    &:not(.answer) {
      background-color: var(--gray-7);
    }
  }

  &:not(:disabled) {
    &:hover {
      background-color: ${(props: any) =>
        props.variant === 'outlined' ? 'var(--blue-9)' : 'transparent'};
      color: ${(props: any) =>
        props.variant === 'outlined' ? 'var(--gray-1)' : 'var(--blue-9)'};
      border-color: ${(props: any) =>
        props.variant === 'outlined' ? 'transparent' : 'var(--blue-9)'};
    }
  }

  &.answer {
    .text {
      padding-right: 0.5rem;
    }
  }

  .icon {
    width: 1rem;
    position: absolute;
    left: 0;
    width: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-2) 0 0 var(--radius-2);
    transition: background-color 0.2s ease-in-out;
    ${(props: any) => {
      if (props.answerStatus === 'correct') {
        return `
          background-color: var(--green-8);
          `;
      }

      if (props.answerStatus === 'incorrect') {
        return `

          background-color: var(--red-8);
          `;
      }
    }};
  }

  &.next,
  &.play {
    padding-left: 1rem;
    padding-right: 2rem;

    .icon {
      right: 0;
      left: auto;
    }
  }
`;
