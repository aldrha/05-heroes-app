import { useQuery } from '@tanstack/react-query';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';

export const usePaginatedHero = (page: number, limit: number, category: string = 'all') => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroesByPageAction(+page, +limit, category), // cuando en el tanstack se usa una queryFn con parametros, estos mismos deben usarse en el queryKey => OBLIGATORIO
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
