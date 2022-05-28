import { FC } from 'react';
import { Label, Input } from './styles';
interface IRadioInputProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
  name: string;
}

const RadioInput: FC<IRadioInputProps> = ({
  label,
  onChange,
  value,
  checked,
  name
}) => {
  return (
    <>
      <Label key={value}>
        <Input
          type="radio"
          value={value}
          name={name}
          checked={checked}
          onChange={() => onChange(value)}
        />
        {label}
      </Label>
    </>
  );
};

export default RadioInput;
