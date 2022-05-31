import { FC } from 'react';
import { ButtonEl } from './styles';
interface IButtonProps {
  className?: string;
  onClick: (e: any) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  variant?: 'outlined' | 'solid';
  isCorrect?: boolean | null;
  content: string;
}

const Button: FC<IButtonProps> = ({
  className,
  content,
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
      type={type}
      disabled={disabled}
      variant={variant}
      isCorrect={isCorrect}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Button;
