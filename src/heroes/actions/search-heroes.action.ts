import { heroApi } from '../api/hero.api';
import type { Hero } from '../types/hero.interface';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Option {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async (options: Option = {}) => {
  const { name, team, strength, category, status, universe } = options;

  if (!name && !team && !strength && !category && !status && !universe) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>('/search', {
    params: {
      name,
      team,
      strength,
      category,
      status,
      universe,
    },
  });

  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
};
