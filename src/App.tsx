import { useEffect, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { MdArrowRightAlt } from 'react-icons/md';
import { getCategories, getQuestions } from './api';
import SelectMenu from './components/selectMenu';
import RadioInput from './components/radioInput';
import Button from './components/button';
import Question from './components/question';
import GameOptions from './components/gameOptions';
import Score from './components/score';
import { ApiQuestion, GameQuestion, Options, GameStatus } from './types';

import { GlobalStyle, Wrapper, Inner, Title } from './styles';
const App: FC = () => {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    score: 0,
    currentQuestion: 0,
    view: 'options'
  });

  const [questionsError, setQuestionsError] = useState<string>('');

  const formatAnswers = (incorrect: string[], correct: string): string[] => {
    const allAnswers = [...incorrect, correct];
    const shuffledAnswers = allAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffledAnswers;
  };

  const handleGetQuestions = (gameOptions: Options) => {
    getQuestions(gameOptions)
      .then((data) => {
        const questions = data.map(
          ({
            question,
            category,
            difficulty,
            correct_answer,
            incorrect_answers
          }: ApiQuestion): GameQuestion => ({
            question,
            category,
            difficulty,
            answers: formatAnswers(incorrect_answers, correct_answer),
            correct: correct_answer
          })
        );
        // Adding a question with multiple correct answers to satisfy requirements.
        // The Open Triva DB API does not provide a way to get questions with multiple correct answers.
        const multiAnswerQuestion = {
          answers: ['Wyoming', 'Idaho', 'Arizona', 'Kansas'],
          category: 'Geography',
          correct: ['Wyoming', 'Idaho'],
          difficulty: 'easy',
          question: 'Which of these states is north of Colorado?'
        };

        const newQuestions = questions;
        newQuestions.splice(0, 1, multiAnswerQuestion);
        setQuestions(newQuestions);
        setGameStatus({
          ...gameStatus,
          view: 'question'
        });
      })
      .catch((err) => {
        console.log(err);
        setQuestionsError(err);
      });
  };

  const handleStartOver = (): void => {
    setGameStatus({
      score: 0,
      currentQuestion: 0,
      view: 'options'
    });
  };

  const getScoreMessage = (score: number, totalQuestions: number) => {
    if (score / totalQuestions === 1) {
      return "Prefect Score! You're a Trivia Master!";
    }

    if (score / totalQuestions >= 0.8) {
      return 'You are a Trivia Wizard!';
    }

    if (score / totalQuestions >= 0.5) {
      return 'Not bad!';
    }

    if (score / totalQuestions >= 0.1) {
      return 'Not bad, but you can do better!';
    }

    return 'Better luck next time!';
  };

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.log(err);
        setCategoryError(err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Wrapper>
        {gameStatus.view === 'options' && <Title>Let's play Trivia!</Title>}
        {gameStatus.view === 'question' && (
          <Title>
            {`Question ${gameStatus.currentQuestion + 1} of ${
              questions.length
            } |
            Score: ${gameStatus.score}`}
          </Title>
        )}
        {gameStatus.view === 'score' && (
          <Title>{getScoreMessage(gameStatus.score, questions.length)}</Title>
        )}

        <Inner>
          {gameStatus.view === 'options' && (
            <GameOptions getQuestions={handleGetQuestions} />
          )}
          {gameStatus.view === 'question' &&
            questions.length &&
            gameStatus.currentQuestion <= questions.length - 1 && (
              <Question
                key={questions[gameStatus.currentQuestion].question}
                question={questions[gameStatus.currentQuestion]}
                totalQuestions={questions.length}
                currentQuestion={gameStatus.currentQuestion}
                setGameStatus={setGameStatus}
                gameStatus={gameStatus}
                startOver={handleStartOver}
              />
            )}{' '}
          {gameStatus.view === 'score' && (
            <Score>
              <ScoreMessage>
                Your score: {gameStatus.score} / {questions.length}
              </ScoreMessage>
              <Button
                type="button"
                onClick={() => handleStartOver()}
                content="Start over"
                icon={<MdAutorenew />}
              />
            </Score>
          )}
        </Inner>
      </Wrapper>
    </>
  );
};

export default App;
