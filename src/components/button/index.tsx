import { FC } from 'react';
import { ButtonEl } from './styles';
interface IButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick: (e: any) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  variant?: 'outlined' | 'solid';
  answerStatus?: string;
  content: string;
  icon?: React.ReactNode;
}

const Button: FC<IButtonProps> = ({
  className,
  content,
  onClick,
  type = 'button',
  variant = 'solid',
  disabled,
  answerStatus,
  icon
}) => {
  return (
    <ButtonEl
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      variant={variant}
      answerStatus={answerStatus}
    >
      <span className="icon">{icon}</span>
      <span className="text" dangerouslySetInnerHTML={{ __html: content }} />
    </ButtonEl>
  );
};

export default Button;
