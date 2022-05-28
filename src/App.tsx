import { useEffect, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { getCategories, getQuestions } from './api';
import SelectMenu from './components/selectMenu';
import RadioInput from './components/radioInput';
import Button from './components/button';
import Question from './components/question';
import {
  ApiQuestion,
  GameQuestion,
  Category,
  Options,
  GameStatus,
  Difficulty
} from './types';

import {
  GlobalStyle,
  Wrapper,
  Inner,
  Title,
  SubHeading,
  GameOptions,
  GameOption,
  OptionsLabel,
  Difficulties,
  Questions,
  Score
} from './styles';
const App: FC = () => {
  /**
   * Todo
   * - Add a loading state
   * - Add timers for answer and next question
   * - Break things out into components
   * - Styling
   */

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [gameOptions, setGameOptions] = useState<Options>({
    amount: 10,
    category: -1,
    difficulty: 'Mixed'
  });

  const [gameStatus, setGameStatus] = useState<GameStatus>({
    score: 0,
    currentQuestion: 0,
    isPlaying: false,
    isCurrentCorrect: null
  });

  const [categoryError, setCategoryError] = useState<string>('');
  const [questionsError, setQuestionsError] = useState<string>('');

  const handleCategoryChange = (id: number) => {
    setGameOptions({ ...gameOptions, category: id });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setGameOptions({ ...gameOptions, difficulty });
  };

  const getAnswers = (incorrect: string[], correct: string): string[] => {
    const allAnswers = [...incorrect, correct];
    const shuffledAnswers = allAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffledAnswers;
  };

  const handleGetQuestions = () => {
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
            answers: getAnswers(incorrect_answers, correct_answer),
            correct: correct_answer
          })
        );
        setQuestions(questions);
        setGameStatus({
          ...gameStatus,
          isPlaying: true
        });
      })
      .catch((err) => {
        console.log(err);
        setQuestionsError(err);
      });
  };

  const handleCheckAnswer = (answer: string, correctAnswer: string): void => {
    console.log(answer, correctAnswer);
    if (answer === correctAnswer) {
      setGameStatus({
        ...gameStatus,
        isCurrentCorrect: true,
        score: gameStatus.score + 1
      });
    } else {
      setGameStatus({
        ...gameStatus,
        isCurrentCorrect: false
      });
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
      currentQuestion: gameStatus.currentQuestion + 1,
      isCurrentCorrect: null
    });
  };

  const handleStartOver = (): void => {
    setGameStatus({
      score: 0,
      currentQuestion: 0,
      isPlaying: false,
      isCurrentCorrect: null
    });
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
        <Title>Let's play Trivia!</Title>
        <Inner>
          {!gameStatus.isPlaying ? (
            <GameOptions>
              <SubHeading>Game Options</SubHeading>
              <GameOption>
                <OptionsLabel>Category</OptionsLabel>
                <SelectMenu
                  options={categories}
                  onChange={handleCategoryChange}
                  label="Category"
                />
              </GameOption>
              <GameOption>
                <OptionsLabel>Difficulty</OptionsLabel>
                <Difficulties>
                  {difficulties.map((level) => (
                    <RadioInput
                      key={level}
                      label={level}
                      name="difficulty"
                      value={level}
                      checked={gameOptions.difficulty === level}
                      onChange={() => handleDifficultyChange(level)}
                    />
                  ))}
                </Difficulties>
              </GameOption>
              <Button onClick={handleGetQuestions}>Let's Play!</Button>
            </GameOptions>
          ) : (
            <>
              {questions.length &&
              gameStatus.currentQuestion <= questions.length - 1 ? (
                <Question
                  key={questions[gameStatus.currentQuestion].question}
                  question={questions[gameStatus.currentQuestion]}
                  totalQuestions={questions.length}
                  currentQuestion={gameStatus.currentQuestion}
                  isCorrect={gameStatus.isCurrentCorrect}
                  checkAnswer={handleCheckAnswer}
                  nextQuestion={handleNextQuestion}
                  startOver={handleStartOver}
                />
              ) : (
                <Score>
                  <SubHeading>That's it!</SubHeading>
                  <p>Score {gameStatus.score}</p>
                </Score>
              )}
            </>
          )}
        </Inner>
      </Wrapper>
    </>
  );
};

export default App;
