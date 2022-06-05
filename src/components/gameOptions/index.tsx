import { FC, useState, useEffect } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { getCategories } from '../../api';
import { Category, Options, Difficulty } from '../../types';
import { Heading, GameOption } from './styles';

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
  const handleCategoryChange = (value: number) => {
    setGameOptions({ ...gameOptions, category: value });
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGameOptions({
      ...gameOptions,
      difficulty: (event.target as HTMLInputElement).value
    });
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

  if (categoryError) {
    return (
      <Heading>
        <Typography
          variant="h2"
          sx={{
            fontSize: 'h5.fontSize',
            fontWeight: '400'
          }}
        >
          There was a problem fetching the categories. Try refreshing the
          page...
        </Typography>
      </Heading>
    );
  }

  return (
    <>
      <Heading>
        <Typography
          variant="h2"
          sx={{
            fontSize: 'h5.fontSize',
            fontWeight: '400'
          }}
        >
          Game Options
        </Typography>
      </Heading>
      <GameOption>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            name="category"
            value={gameOptions.category}
            onChange={(e) => {
              handleCategoryChange(e.target.value as number);
            }}
            label="Category"
          >
            <MenuItem value="-1" selected>
              Mixed
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </GameOption>
      <GameOption>
        <FormControl>
          <FormLabel id="difficulty">Difficulty</FormLabel>
          <RadioGroup
            row
            aria-label="difficulty"
            name="difficulty"
            onChange={handleDifficultyChange}
            value={gameOptions.difficulty}
          >
            {difficulties.map((difficulty) => (
              <FormControlLabel
                key={difficulty}
                value={difficulty}
                control={<Radio />}
                label={difficulty}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </GameOption>
      <Button
        onClick={() => getQuestions(gameOptions)}
        variant="contained"
        endIcon={<ArrowRightAltIcon />}
      >
        Let's Play!
      </Button>
    </>
  );
};

export default GameOptions;
