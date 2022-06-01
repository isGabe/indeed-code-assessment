import { FC, useState, Dispatch, SetStateAction } from 'react';
import Button from '../button';
import { MdArrowRightAlt, MdAutorenew, MdDone, MdClear } from 'react-icons/md';
import { GameQuestion, GameStatus } from '../../types';

import {
  Wrapper,
  Info,
  Detail,
  QuestionEl,
  Answers,
  Message,
  Navigation
} from './styles';
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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
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

  const getAnswerStatus = (answer: string): string | undefined => {
    if (selectedAnswer === answer) {
      return isCorrect ? 'correct' : 'incorrect';
    }

    return undefined;
  };

  const getAnswerIcon = (answer: string): JSX.Element | undefined => {
    if (selectedAnswer === answer) {
      return isCorrect ? <MdDone /> : <MdClear />;
    }

    return undefined;
  };

  return (
    <Wrapper key={question.question}>
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
      <Message isCorrect={isCorrect !== null && isCorrect}>
        {isCorrect !== null && isCorrect
          ? 'Correct!'
          : isCorrect !== null && !isCorrect
          ? 'Incorrect!'
          : ''}
      </Message>
      <Answers>
        {question.answers.map((answer) => (
          <Button
            className="answer"
            variant="outlined"
            key={answer}
            onClick={() => handleCheckAnswer(answer, question.correct)}
            disabled={isCorrect !== null}
            answerStatus={getAnswerStatus(answer)}
            icon={getAnswerIcon(answer)}
            content={answer}
          />
        ))}
      </Answers>
      <Navigation>
        <Button
          type="button"
          onClick={() => startOver()}
          content="Start over"
          icon={<MdAutorenew />}
        />
        <Button
          className="next"
          onClick={() => handleNextQuestion()}
          content={
            gameStatus.currentQuestion === totalQuestions - 1
              ? 'Get Score'
              : 'Next Question'
          }
          icon={<MdArrowRightAlt />}
          disabled={isCorrect === null}
        />
      </Navigation>
    </Wrapper>
  );
};

export default Question;
