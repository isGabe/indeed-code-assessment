import { useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import { getQuestions } from './api';
import Button from '@mui/material/Button';
import Question from './components/question';
import GameOptions from './components/gameOptions';
import Score from './components/score';
import { ApiQuestion, GameQuestion, Options, GameStatus } from './types';

import { GlobalStyle, Wrapper, Inner, Header } from './styles';
const App: FC = () => {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    score: 0,
    currentQuestion: 0,
    view: 'options'
  });

  const [questionsError, setQuestionsError] = useState<string>('');

  // The Open Trivia API returns the correct answer separately,
  // so we need to combine it with the other answers.
  const formatAnswers = (incorrect: string[], correct: string): string[] => {
    const allAnswers = [...incorrect, correct];
    // If it's a true false question, ensure the order is ['True', 'False'].
    if (allAnswers.length === 2) {
      return allAnswers.sort((a, b) => (a < b ? 1 : -1));
    }
    // Shuffle the answers, so the correct answer isn't always in the same position.
    const shuffledAnswers = allAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffledAnswers;
  };

  const handleGetQuestions = (gameOptions: Options) => {
    //@ts-ignore
    getQuestions(gameOptions)
      .then((data) => {
        console.log(data);
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
        console.log(questions);
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

  const getHeaderText = () => {
    switch (gameStatus.view) {
      case 'options':
        return "Let's play Trivia!";
      case 'question':
        return `Question ${gameStatus.currentQuestion + 1} of ${
          questions.length
        } | Score: ${gameStatus.score}`;
      case 'score':
        return 'How did you do?';
    }
  };
  const theme = createTheme();

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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <GlobalStyle />
      <Wrapper variant="outlined">
        <Header>
          <Typography
            variant="h1"
            color={theme.palette.primary.main}
            sx={{
              fontSize: 'h4.fontSize',
              textAlign: 'center',
              fontWeight: '400'
            }}
          >
            {getHeaderText()}
          </Typography>
        </Header>

        <Inner>
          {gameStatus.view === 'options' && (
            <GameOptions getQuestions={handleGetQuestions} />
          )}
          {gameStatus.view === 'question' &&
            (questions.length && !questionsError ? (
              <Question
                key={questions[gameStatus.currentQuestion].question}
                question={questions[gameStatus.currentQuestion]}
                totalQuestions={questions.length}
                currentQuestion={gameStatus.currentQuestion}
                setGameStatus={setGameStatus}
                gameStatus={gameStatus}
                startOver={handleStartOver}
              />
            ) : (
              <div>
                <p>
                  There was a problem fetching the questions. Please try again.
                </p>
                <Button
                  variant="contained"
                  onClick={() => handleStartOver()}
                  startIcon={<ReplayIcon />}
                >
                  Play Again!
                </Button>
              </div>
            ))}
          {gameStatus.view === 'score' && (
            <Score
              score={gameStatus.score}
              totalQuestions={questions.length}
              startOver={handleStartOver}
            />
          )}
        </Inner>
      </Wrapper>
    </>
  );
};

export default App;
