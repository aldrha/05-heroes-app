import { CustomBreadcrumb } from '@/components/custom/CustomBreadcrumb';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';

export const SearchPage = () => {
  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

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
    </>
  );
};

export default SearchPage;
