import { CustomBreadcrumb } from '@/components/custom/CustomBreadcrumb';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { HeroStats } from '@/heroes/components/HeroStats';
import { useSearchParamsHome } from '@/heroes/hooks/useSearchParamsHome';
import { useQuery } from '@tanstack/react-query';
import { SearchControls } from './ui/SearchControls';

export const SearchPage = () => {
  const { searchParams } = useSearchParamsHome();

  const valueSearch = searchParams.get('name') ?? '';

  const { data: heroesSearch } = useQuery({
    queryKey: ['search', 'name', valueSearch],
    queryFn: () => searchHeroesAction({ name: valueSearch }),
    enabled: valueSearch.length > 0,
  });
  return (
    <>
      {/* Header */}
      <CustomJumbotron title="Búsqueda de SuperHéroes" description="Descubre, explora y administra super héroes y villanos" />

      {/* Breadcrumbs */}
      <CustomBreadcrumb
        currentPage="Búsqueda de súper heroes"
        // breadcrumbs={[
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        //   { label: 'Home3', to: '/' },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Controls */}
      <SearchControls />

      {/* Lista de Heroes */}
      <HeroGrid heroes={heroesSearch?.heroes ?? []} />
    </>
  );
};

export default SearchPage;
