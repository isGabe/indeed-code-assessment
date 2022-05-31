import { useEffect, useState, FC } from 'react';
import { Helmet } from 'react-helmet';
import { MdArrowRightAlt, MdAutorenew } from 'react-icons/md';
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
  Score,
  ScoreMessage
} from './styles';
const App: FC = () => {
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
    isPlaying: false
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
          isPlaying: true
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
      isPlaying: false
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
              <Button
                onClick={handleGetQuestions}
                content="Let's Play"
                className="play"
                icon={<MdArrowRightAlt />}
              />
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
                  setGameStatus={setGameStatus}
                  gameStatus={gameStatus}
                  startOver={handleStartOver}
                />
              ) : (
                <Score>
                  <SubHeading>That's it!</SubHeading>
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
            </>
          )}
        </Inner>
      </Wrapper>
    </>
  );
};

export default App;
