export type ApiQuestion = {
  question: string;
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type GameQuestion = {
  question: string;
  category: string;
  difficulty: string;
  answers: string[];
  correct: string | string[];
};

export type Category = {
  id: number;
  name: string;
};

export type Options = {
  amount: number;
  category: number;
  difficulty: string;
};

export type GameStatus = {
  score: number;
  currentQuestion: number;
  view: 'options' | 'question' | 'score';
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';
