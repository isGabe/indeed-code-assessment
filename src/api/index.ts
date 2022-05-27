const API_URL = 'https://opentdb.com';
type Options = {
  amount: number;
  category?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
};
export const getQuestions = async ({
  amount = 10,
  category = -1,
  difficulty = 'mixed'
}) => {
  difficulty = difficulty.toLowerCase();
  const url =
    `${API_URL}/api.php?amount=${amount}` +
    (category !== -1 ? `&category=${category}` : '') +
    (difficulty !== 'mixed' ? `&difficulty=${difficulty}` : '');

  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error('There was a problem fetching the questions');
  }

  const data = await response.json();
  return data.results;
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/api_category.php`);
  if (response.status !== 200) {
    throw new Error('There was a problem fetching the categories');
  }

  const data = await response.json();
  return data.trivia_categories;
};
