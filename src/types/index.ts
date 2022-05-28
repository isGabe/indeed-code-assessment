export type ApiQuestion = {
  question: string;
  category: number;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type GameQuestion = {
  question: string;
  category: number;
  difficulty: string;
  answers: string[];
  correct: string;
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
  isPlaying: boolean;
  isCurrentCorrect: null | boolean;
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';
