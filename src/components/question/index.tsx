import { FC } from 'react';
import Button from '../button';
// import { StyledButton } from './styles';
import { GameQuestion } from '../../types';

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
  checkAnswer: (answer: string, correctAnswer: string) => void;
  nextQuestion: () => void;
  startOver: () => void;
  isCorrect: boolean | null;
}

const Question: FC<IQuestionProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  checkAnswer,
  nextQuestion,
  startOver,
  isCorrect
}) => {
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
              checkAnswer(answer, question.correct);
            }}
            disabled={isCorrect !== null}
            isCorrect={answer === question.correct}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Button>
        ))}
      </Answers>
      <Navigation>
        <Button type="button" onClick={() => startOver()}>
          Start over
        </Button>
        {isCorrect !== null && (
          <Button onClick={() => nextQuestion()}>
            {currentQuestion === totalQuestions - 1
              ? 'Finish'
              : 'Next Question'}
          </Button>
        )}
      </Navigation>
    </Wrapper>
  );
};

export default Question;
