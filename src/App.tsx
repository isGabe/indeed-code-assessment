import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './IndeedLogo.svg';
import { getCategories, getQuestions } from './api';

export default function App() {
  /**
   * Todo
   * - Add a loading state
   * - Add question navigation
   * - Add state for score
   * - Randomize questions
   * - Add a timer
   * - Break things out into components
   * - Styling
   */
  type ApiQuestion = {
    question: string;
    category: number;
    difficulty: string;
    correct_answer: string;
    incorrect_answers: string[];
  };

  type GameQuestion = {
    question: string;
    category: number;
    difficulty: string;
    answers: string[];
    correct: string;
  };

  type Category = {
    id: number;
    name: string;
  };

  type Options = {
    amount: number;
    category: number;
    difficulty: string;
  };

  type GameStatus = {
    currentQuestion: number;
    score: number;
    isPlaying: boolean;
    isCurrentCorrect: null | boolean;
  };

  const difficulties: string[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [gameOptions, setGameOptions] = useState<Options>({
    amount: 10,
    category: -1,
    difficulty: 'Mixed'
  });

  const [gameStatus, setGameStatus] = useState<GameStatus>({
    currentQuestion: 0,
    score: 0,
    isPlaying: false,
    isCurrentCorrect: null
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [categoryError, setCategoryError] = useState<string>('');
  const [questionsError, setQuestionsError] = useState<string>('');

  const handleCategoryChange = (id: number) => {
    console.log(id);
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
          }: ApiQuestion) => ({
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

  const handleCheckAnswer = (answer: string, correctAnswer: string) => {
    if (answer === correctAnswer) {
      setGameStatus({
        ...gameStatus,
        score: gameStatus.score + 1,
        isCurrentCorrect: true
      });
    } else {
      setGameStatus({
        ...gameStatus,
        isCurrentCorrect: false
      });
    }

    // setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.log(err);
        setCategoryError(err);
      });
  }, []);

  console.log(categories, questions);
  console.log(gameOptions);
  return (
    <div>
      <h1>Let's play Trivia!</h1>
      {gameStatus.isPlaying === false && (
        <div>
          <p>Select a category:</p>
          <div>
            {categories.map(({ id, name }) => (
              <label key={id}>
                <input
                  type="radio"
                  value={name}
                  name="categories"
                  checked={gameOptions.category === id}
                  onChange={() => handleCategoryChange(id)}
                />
                {name}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="categories"
                checked={gameOptions.category === -1}
                onChange={() => handleCategoryChange(-1)}
              />
              Mixed
            </label>
          </div>
          <p>Select a difficulty:</p>
          {difficulties.map((level) => (
            <label key={level}>
              <input
                type="radio"
                value={level}
                name="difficulty"
                checked={gameOptions.difficulty === level}
                onChange={() => handleDifficultyChange(level)}
              />
              {level}
            </label>
          ))}
          <button type="button" onClick={handleGetQuestions}>
            Let's Play!
          </button>
        </div>
      )}
      <div>
        {!!questions.length && (
          <div key={questions[currentQuestion].question}>
            <span>Category: {questions[currentQuestion].category}</span>
            <span>Difficulty: {questions[currentQuestion].difficulty}</span>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <p
              dangerouslySetInnerHTML={{
                __html: questions[currentQuestion].question
              }}
            />
            <div>
              {gameStatus.isCurrentCorrect === true && <span>Correct!</span>}
              {gameStatus.isCurrentCorrect === false && <span>Incorrect!</span>}
              {questions[currentQuestion].answers.map((answer) => (
                <button
                  key={answer}
                  type="button"
                  onClick={() =>
                    handleCheckAnswer(
                      answer,
                      questions[currentQuestion].correct
                    )
                  }
                >
                  {/* <input
                    type="radio"
                    value={answer}
                    name="answers"
                    // checked={gameOptions.difficulty === answer}
                    // onChange={() => handleDifficultyChange(answer)}
                  /> */}
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
