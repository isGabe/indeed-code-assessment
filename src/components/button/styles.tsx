import styled from 'styled-components';

export const ButtonEl = styled.button`
  background-color: ${(props: any) =>
    props.variant === 'outlined' ? 'transparent' : 'var(--blue)'};
  border-radius: 0.5rem;
  border: 0.0625rem solid transparent;
  border-color: ${(props: any) =>
    props.variant === 'outlined' ? 'var(--blue)' : 'transparent'};
  box-shadow: none;
  box-sizing: border-box;
  color: ${(props: any) =>
    props.variant === 'outlined' ? 'var(--blue)' : '#fff'};
  cursor: pointer;
  display: block;
  flex-shrink: 0;
  letter-spacing: 0;
  line-height: 1.125rem;
  line-height: 1.43;
  margin: 0;
  min-width: 94px;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  word-break: keep-all;

  &.answer {
    font-size: var(--font-size-3);
  }

  &.selected {
    ${(props: any) => {
      if (props.variant === 'outlined') {
        if (props.isCorrect === true) {
          return `
          background-color: var(--green-9);
          `;
        }

        if (props.isCorrect === false) {
          return `
          background-color: var(--red-9);
          `;
        }
      }
    }};
  }
  &:hover:not(:disabled) {
    background-color: ${(props: any) =>
      props.variant === 'outlined' ? 'var(--blue)' : '#fff'};
    color: ${(props: any) =>
      props.variant === 'outlined' ? '#fff' : 'var(--blue)'};
    border-color: ${(props: any) =>
      props.variant === 'outlined' ? 'transparent' : 'var(--blue)'};
  }
`;
