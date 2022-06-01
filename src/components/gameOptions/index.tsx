import { FC, useState, useEffect } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { getCategories } from '../../api';
import SelectMenu from '../selectMenu';
import RadioInput from '../radioInput';
import Button from '../button';
import { Category, Options, Difficulty } from '../../types';
import {
  Wrapper,
  SubHeading,
  OptionsLabel,
  GameOption,
  Difficulties
} from './styles';

interface IGameOptionsProps {
  getQuestions: (gameOptions: Options) => void;
}

const GameOptions: FC<IGameOptionsProps> = ({ getQuestions }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string>('');
  const [gameOptions, setGameOptions] = useState<Options>({
    amount: 10,
    category: -1,
    difficulty: 'Mixed'
  });
  const handleCategoryChange = (id: number) => {
    setGameOptions({ ...gameOptions, category: id });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setGameOptions({ ...gameOptions, difficulty });
  };
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.log(err);
        setCategoryError(err);
      });
  }, []);

  return (
    <Wrapper>
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
        onClick={() => getQuestions(gameOptions)}
        content="Let's Play"
        className="play"
        icon={<MdArrowRightAlt />}
      />
    </Wrapper>
  );
};

export default GameOptions;
