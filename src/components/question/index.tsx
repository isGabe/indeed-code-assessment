import { FC, useState, Dispatch, SetStateAction } from 'react';
import Button from '../button';
// import { StyledButton } from './styles';
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

  const handleCheckAnswer = (answer: string, correctAnswer: string): void => {
    console.log(answer, correctAnswer);
    if (answer === correctAnswer) {
      setIsCorrect(true);
      setGameStatus({
        ...gameStatus,
        score: gameStatus.score + 1
      });
    } else {
      setIsCorrect(false);
    }
    // setTimeout(() => {
    //   setGameStatus({
    //     ...gameStatus,
    //     currentQuestion: gameStatus.currentQuestion + 1
    //   });
    // }, 2000);
  };

  const handleNextQuestion = (): void => {
    setGameStatus({
      ...gameStatus,
      currentQuestion: gameStatus.currentQuestion + 1
    });
  };
  return (
    <Wrapper key={question.question}>
      <Info>
        <Detail>Category: {question.category}</Detail>
        <Detail>Difficulty: {question.difficulty}</Detail>
        <Detail>
          Question {currentQuestion + 1} of {totalQuestions}
        </Detail>
      </Info>
      <QuestionEl
        dangerouslySetInnerHTML={{
          __html: question.question
        }}
      />
      {isCorrect === true && <Message>Correct!</Message>}
      {isCorrect === false && <Message inCorrect>Incorrect!</Message>}
      <Answers>
        {question.answers.map((answer) => (
          <Button
            className="answer"
            variant="outlined"
            key={answer}
            onClick={(e: any) => {
              e.target.classList.add('selected');
              handleCheckAnswer(answer, question.correct);
            }}
            disabled={isCorrect !== null}
            isCorrect={answer === question.correct}
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
