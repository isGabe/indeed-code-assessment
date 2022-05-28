import { FC } from 'react';
import { ButtonEl } from './styles';
interface IButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick: (e: any) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  variant?: 'outlined' | 'solid';
  isCorrect?: boolean | null;
}

const Button: FC<IButtonProps> = ({
  className,
  children,
  onClick,
  type = 'button',
  variant = 'solid',
  disabled,
  isCorrect
}) => {
  return (
    <ButtonEl
      className={className}
      onClick={onClick}
      type="button"
      disabled={disabled}
      variant={variant}
      isCorrect={isCorrect}
    >
      {children}
    </ButtonEl>
  );
};

export default Button;
