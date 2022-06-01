import { FC, useState, useEffect } from 'react';
import { MdAutorenew } from 'react-icons/md';
import Button from '../button';
import boom from '../../images/boom.png';
import thumbsUp from '../../images/thumbsUp.png';
import trophy from '../../images/trophy.png';
import wizard from '../../images/wizard.png';
import expressionless from '../../images/expressionless.png';
import { Wrapper, ScoreMessage } from './styles';
interface IScoreProps {
  score: number;
  totalQuestions: number;
  startOver: () => void;
}

type ScoreMessage = {
  message: string;
  image: string;
};

const Score: FC<IScoreProps> = ({ score, totalQuestions, startOver }) => {
  const [scoreMessage, setScoreMessage] = useState<ScoreMessage>({
    message: '',
    image: ''
  });

  useEffect(() => {
    if (score / totalQuestions === 1) {
      setScoreMessage({
        message: "Prefect Score! You're a Trivia Master!",
        image: trophy
      });
    } else if (score / totalQuestions >= 0.8) {
      setScoreMessage({ message: 'You are a Trivia Wizard!', image: wizard });
    } else if (score / totalQuestions >= 0.5) {
      setScoreMessage({ message: 'Not bad!', image: boom });
    } else if (score / totalQuestions >= 0.1) {
      setScoreMessage({
        message: 'Not bad, but you can do better!',
        image: thumbsUp
      });
    } else {
      setScoreMessage({
        message: 'Not great, but give it another try!',
        image: expressionless
      });
    }
  }, []);

  return (
    <Wrapper>
      <ScoreMessage>
        <img src={scoreMessage.image} alt={scoreMessage.message} />
        <h2>{scoreMessage.message}</h2>
        <p>
          You got {score} questions out of {totalQuestions} right!
        </p>
      </ScoreMessage>
      <Button
        className="playAgain"
        type="button"
        onClick={() => startOver()}
        content="Play again!"
        icon={<MdAutorenew />}
      />
    </Wrapper>
  );
};

export default Score;
