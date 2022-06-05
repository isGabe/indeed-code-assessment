import { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
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

type ScoreData = {
  score: number;
  totalQuestions: number;
  date: string;
};

const Score: FC<IScoreProps> = ({ score, totalQuestions, startOver }) => {
  const [existingScores, setExistingScores] = useState<ScoreData[]>(() => {
    const data = localStorage.getItem('scores');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  });

  const [scoreMessage, setScoreMessage] = useState<ScoreMessage>({
    message: '',
    image: ''
  });

  useEffect(() => {
    setExistingScores([
      ...existingScores,
      { score, totalQuestions, date: new Date().toLocaleDateString() }
    ]);
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

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(existingScores));
  }, [existingScores]);

  const getHighScoreMessage = (): string => {
    const highScore = existingScores.reduce((acc, curr) => {
      return curr.score > acc.score ? curr : acc;
    });
    return `Your best score so far was ${highScore.score} out of ${highScore.totalQuestions}, which you got on ${highScore.date}.`;
  };
  return (
    <Wrapper>
      <ScoreMessage>
        <img src={scoreMessage.image} alt={scoreMessage.message} />
        <h2>{scoreMessage.message}</h2>
        <p>
          You got {score} questions out of {totalQuestions} right!
        </p>
        {!!existingScores.length && <p>{getHighScoreMessage()}</p>}
      </ScoreMessage>
      <Button
        variant="contained"
        onClick={() => startOver()}
        startIcon={<ReplayIcon />}
      >
        Play Again!
      </Button>
    </Wrapper>
  );
};

export default Score;
