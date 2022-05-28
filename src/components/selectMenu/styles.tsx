import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0;
`;
export const SelectWrapper = styled.div`
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--grayMedium);
  cursor: pointer;
  display: grid;
  font-size: 1rem;
  grid-template-areas: 'select';
  line-height: 1.1;
  max-width: 30ch;
  min-width: 15ch;
  padding: 0.75rem 1rem;
  position: relative;

  select,
  &::after {
    grid-area: select;
  }

  // Custom arrow
  &::after {
    content: '';
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: var(--grayMedium);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  select:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid var(--select-focus);
    border-radius: inherit;
  }
`;
export const Label = styled.label`
  margin: 0;
`;

export const Select = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;
`;

export const Option = styled.option`
  margin: 0;
`;
