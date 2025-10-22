import { heroApi } from '../api/hero.api';
import type { Hero } from '../types/hero.interface';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Option {
  name?: string;
  team?: string;
  category?: string;
  umiverse?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async ({ name, strength }: Option) => {
  const { data } = await heroApi.get<Hero[]>('/search', {
    params: {
      name: name,
      strength: strength,
    },
  });

  const heroes = data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes: heroes,
  };
};
