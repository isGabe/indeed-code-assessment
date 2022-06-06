import { FC, useState, Dispatch, SetStateAction } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { GameQuestion, GameStatus } from '../../types';

import { Info, Detail, QuestionEl, Answers, Navigation } from './styles';
interface IQuestionProps {
  question: GameQuestion;
  currentQuestion: number;
  totalQuestions: number;
  setGameStatus: Dispatch<SetStateAction<GameStatus>>;
  gameStatus: GameStatus;
  startOver: () => void;
}

const Question: FC<IQuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  setGameStatus,
  gameStatus,
  startOver
}) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleCheckAnswer = (
    answer: string,
    correctAnswer: string | string[]
  ): void => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer || correctAnswer.includes(answer)) {
      setIsCorrect(true);
      setGameStatus({
        ...gameStatus,
        score: gameStatus.score + 1
      });
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = (): void => {
    if (currentQuestion + 1 !== totalQuestions) {
      setGameStatus({
        ...gameStatus,
        currentQuestion: gameStatus.currentQuestion + 1
      });
    } else {
      setGameStatus({
        ...gameStatus,
        view: 'score'
      });
    }
  };

  return (
    <>
      <Info>
        <Detail>
          <span className="label">Category:</span>{' '}
          <span className="text">{question.category}</span>
        </Detail>
        <Detail>
          <span className="label">Difficulty:</span>{' '}
          <span className="text">{question.difficulty}</span>
        </Detail>
      </Info>
      <QuestionEl
        dangerouslySetInnerHTML={{
          __html: question.question
        }}
      />

      {selectedAnswer && (
        <Alert
          severity={isCorrect ? 'success' : 'error'}
          className="message"
          icon={isCorrect ? <CheckIcon /> : <ClearIcon />}
        >
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </Alert>
      )}

      <Answers>
        {question.answers.map((answer) => (
          <Button
            variant={answer === selectedAnswer ? 'contained' : 'outlined'}
            onClick={() => handleCheckAnswer(answer, question.correct)}
            size="large"
            key={answer}
            sx={{ textTransform: 'none', fontSize: '1rem' }}
            disabled={selectedAnswer !== null}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Button>
        ))}
      </Answers>
      <Navigation>
        <Button
          variant="contained"
          onClick={() => startOver()}
          startIcon={<ReplayIcon />}
        >
          Start Over
        </Button>
        <Button
          variant="contained"
          onClick={() => handleNextQuestion()}
          endIcon={<ArrowRightAltIcon />}
          disabled={!selectedAnswer}
        >
          {gameStatus.currentQuestion === totalQuestions - 1
            ? 'Get Score'
            : 'Next Question'}
        </Button>
      </Navigation>
    </>
  );
};

export default Question;
