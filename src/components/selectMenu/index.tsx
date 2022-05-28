import React, { FC } from 'react';
import { Wrapper, SelectWrapper, Label, Select, Option } from './styles';
import { Category } from '../../types';

interface ISelectProps {
  options: Category[];
  onChange: (id: number) => void;
  label: string;
}

const SelectMenu: FC<ISelectProps> = ({ options, onChange, label }) => {
  return (
    <Wrapper>
      <Label className="visuallyHidden">{label}</Label>
      <SelectWrapper>
        <Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange(parseInt(e.target.value))
          }
        >
          <Option value="-1">Mixed</Option>
          {options.map(({ id, name }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
        </Select>
      </SelectWrapper>
    </Wrapper>
  );
};

export default SelectMenu;
