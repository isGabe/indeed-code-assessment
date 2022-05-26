import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from './IndeedLogo.svg';
import { getCategories, getQuestions } from './api';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [gameOptions, setGameOptions] = useState({
    amount: 10,
    category: -1,
    difficulty: ''
  });
  const [category, setCatgegory] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [questionsError, setQuestionsError] = useState('');
  const difficulty = ['easy', 'medium', 'hard', 'mixed'];

  const handleCategoryChange = (id: number) => {
    console.log(id);
    setGameOptions({ ...gameOptions, category: id });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setGameOptions({ ...gameOptions, difficulty });
  };

  const handleGetQuestions = () => {
    getQuestions(gameOptions)
      .then((data) => setQuestions(data))
      .catch((err) => {
        console.log(err);
        setQuestionsError(err);
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

  console.log(categories, questions);
  console.log(gameOptions);
  return (
    <div>
      <h1>Let's play Trivia!</h1>
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
      </div>
      <p>Select a difficulty:</p>
      {difficulty.map((level) => (
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
      <div>
        {questions.map(({ question, category, difficulty }, idx) => (
          <div key={question}>
            <span>Category: {category}</span>
            <span>Difficulty: {difficulty}</span>
            <span>
              Question {idx + 1} of {questions.length}
            </span>
            <p>{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
